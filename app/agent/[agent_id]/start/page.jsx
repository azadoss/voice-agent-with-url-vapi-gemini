'use client'

import React, { useContext, useEffect, useState } from 'react';
import { Timer, Mic, X } from 'lucide-react';
import { AgentDataContext } from '@/context/AgentDataContext';
import Spline from '@splinetool/react-spline';
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner';

function StartAgent() {
    const { agentInfo, setAgentInfo } = useContext(AgentDataContext);
    const [activeUser, setActiveUser] = useState()

    const [vapiInstance, setVapiInstance] = useState(null);
    const [callStatus, setCallStatus] = useState('idle'); // idle, starting, started, speech, listening, stopping, ended, error
    const [lastError, setLastError] = useState(null);

    // --- Initialize Vapi SDK Instance ---
    useEffect(() => {
        console.log("Initializing Vapi SDK...");
        const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

        if (!vapiPublicKey) {
            console.error("VAPI Public Key is missing. Ensure NEXT_PUBLIC_VAPI_PUBLIC_KEY is set.");
            setLastError({ errorMsg: "Configuration Error: VAPI key missing." });
            setCallStatus('error');
            return;
        }

        try {
            const vapi = new Vapi(vapiPublicKey);
            setVapiInstance(vapi);
            console.log("Vapi SDK Initialized.");

            // --- Attach Event Listeners ---
            vapi.on('call-start', () => {
                console.log('Vapi Event: call-start');
                setCallStatus('started');
                setLastError(null);
                toast.success('Call started!');
            });

            vapi.on('speech-start', () => {
                setActiveUser(false)
                setCallStatus('speech');
            });

            vapi.on('speech-end', () => {
                setActiveUser(true)
                setCallStatus('listening');
            });

            vapi.on('call-end', () => {
                console.log('Vapi Event: call-end');
                setCallStatus('ended');
                toast.success('Call ended!');
                setAgentInfo(null); // Reset agent info on call end
            });

            vapi.on('error', (error) => {
                console.error('Vapi Event: error', error);
                setLastError(error);
                setCallStatus('error');
            });

            console.log("Vapi SDK listeners attached.");

        } catch (initError) {
            console.error("Failed to initialize Vapi SDK:", initError);
            setLastError({ errorMsg: "SDK Initialization Failed.", error: initError });
            setCallStatus('error');
        }

        // --- Cleanup Function ---
        return () => {
            console.log("Cleaning up Vapi instance...");
            if (vapiInstance) {
                vapiInstance.stop();
            }
            setVapiInstance(null);
            setCallStatus('idle');
            console.log("Vapi cleanup complete.");
        };
    }, []);

    // --- Effect to Start the Call ---
    useEffect(() => {
        if (vapiInstance && agentInfo && callStatus === 'idle') {
            startCall();
        } else {
            console.log(`Call not starting: vapiInstance=${!!vapiInstance}, agentInfo=${!!agentInfo}, callStatus=${callStatus}`);
        }
    }, [agentInfo, vapiInstance, callStatus]);

    // --- Function to Start the Call ---
    const startCall = async () => {
        if (!agentInfo?.agentData?.questionList || agentInfo.agentData.questionList.length === 0) {
            setLastError({ errorMsg: "Agent data or question list missing." });
            setCallStatus('error');
            return;
        }

        const questionList = agentInfo.agentData.questionList
            .map(item => item?.question)
            .filter(Boolean)
            .join('; ');

        if (!questionList) {
            console.error("Cannot start call: Failed to generate question list string.");
            setLastError({ errorMsg: "Failed to generate question list." });
            setCallStatus('error');
            return;
        }

        const assistantConfig = {
            name: agentInfo?.agentData?.name || "Ava",
            firstMessage: `Hi ${agentInfo?.userName || 'there'}, I'm ${agentInfo?.agentData?.name || "Ava"}, ready for your ${agentInfo?.agentData.title || 'interview'}. How are you today?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are ${agentInfo?.agentData?.name || "Ava"}, an AI voice assistant conducting screening interviews for the role of ${agentInfo?.agentData.title || 'the position'}.
Your goal is to ask the candidate the provided interview questions clearly and assess their responses in a friendly, engaging manner.

**Instructions:**
1.  **Greeting:** Start with the provided first message: "${`Hi ${agentInfo?.userName || 'there'}, I'm ${agentInfo?.agentData?.name || "Ava"}, ready for your ${agentInfo?.agentData.title || 'interview'}. How are you today?`}" Wait for their response before proceeding.
2.  **Introduction:** Briefly explain the process: "Great! I have a few questions lined up for you regarding the ${agentInfo?.agentData.title || 'role'}. I'll ask them one by one."
3.  **Ask Questions:** Ask the following questions *one at a time*. Wait for the candidate's complete response before moving to the next question.
    * Questions: ${questionList}
4.  **Engagement:** Keep the conversation natural. Use short transition phrases like "Okay, next question:", "Got it. Moving on:", "Alright, let's talk about...".
5.  **Clarification/Hints (Use Sparingly):** If the candidate is stuck, you can offer a *small* hint or rephrase *once*. Example: "Could you elaborate on that?" or "Perhaps think about it from the perspective of [relevant concept]?" Avoid giving answers.
6.  **Feedback (Minimal):** Use brief acknowledgments like "Okay", "Understood", or "Thanks for sharing that." Avoid detailed critique during the screening.
7.  **Conclusion:** Once all questions are asked, thank the candidate: "That covers all the questions I had for you. Thanks for taking the time to speak with me today, ${agentInfo?.userName || ''}!" Add a concluding remark like "We'll be in touch regarding the next steps."
8.  **Tone:** Maintain a friendly, professional, and slightly witty/engaging tone throughout. Keep responses concise and conversational.
`.trim(),
                    },
                ],
            },
        };

        console.log("Starting Vapi call with config:", assistantConfig);
        setLastError(null);
        setCallStatus('starting');
        try {
            await vapiInstance.start(assistantConfig);
            // The 'call-start' event will handle the 'started' status
        } catch (startError) {
            console.error("Error starting Vapi call:", startError);
            setLastError({ errorMsg: "Failed to initiate call start.", error: startError });
            setCallStatus('error');
        }
    };

    // --- Function to End the Call ---
    const endCall = () => {
        if (vapiInstance && ['started', 'speech', 'listening', 'starting'].includes(callStatus)) {
            console.log("Stopping Vapi call manually via UI.");
            setCallStatus('stopping');
            vapiInstance.stop();
            // The 'call-end' event will handle resetting agentInfo and 'ended' status
        } else {
            console.log("Cannot stop call: No active instance or call not in progress.");
        }
    };

    // --- Render Logic ---
    const getStatusMessage = () => {
        switch (callStatus) {
            case 'idle': return 'Ready to start...';
            case 'starting': return 'Connecting...';
            case 'started': return 'Greeting...';
            case 'speech': return 'Speaking...';
            case 'listening': return 'Listening...';
            case 'stopping': return 'Ending call...';
            case 'ended': return 'Call ended.';
            case 'error': return `Error: ${lastError?.errorMsg || JSON.stringify(lastError)}`;
            default: return 'Status unknown';
        }
    };

    const isCallActive = ['starting', 'started', 'speech', 'listening'].includes(callStatus);

    if (callStatus === 'error') {
        return <div className="container mx-auto p-4 text-center text-red-600">Error: {lastError?.errorMsg}</div>;
    }

    if (!agentInfo) {
        return <div className="container mx-auto p-4 text-center">Please select an agent to start.</div>;
    }

    return (
        <div className="w-full overflow-x-hidden px-4">
            <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 xl:p-32">
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='font-bold text-xl'>Agent Call</h2>
                    <span className='flex gap-2 items-center text-sm text-muted-foreground'>
                        <Timer className='h-4 w-4' />
                        00:00:00 {/* Placeholder for timer */}
                    </span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                    {/* Agent Display */}
                    <div className='bg-muted h-[350px] md:h-[400px] w-full max-w-[400px] rounded-lg flex flex-col gap-3 justify-center items-center p-4 mx-auto'>
                        <h2 className="font-semibold text-lg mb-2">{agentInfo?.agentData?.name || 'Ava'}</h2>
                        <Spline
                            scene="https://prod.spline.design/8SP5oIdMk48a3IVu/scene.splinecode"
                            style={{ width: '200px', height: '200px' }}
                        />
                        <p className="text-sm text-muted-foreground mt-2">{agentInfo?.agentData?.title || 'Interview'}</p>
                    </div>

                    {/* User Display */}
                    <div className='bg-muted h-[350px] md:h-[400px] w-full max-w-[400px] rounded-lg flex flex-col gap-3 justify-center items-center p-4 mx-auto'>
                        <div className="text-3xl bg-primary text-secondary rounded-full w-16 h-16 flex items-center justify-center mb-2">
                            {agentInfo?.userName ? agentInfo.userName[0].toUpperCase() : '?'}
                        </div>
                        <h2 className='font-semibold text-lg'>{agentInfo?.userName || 'User'}</h2>
                    </div>
                </div>

                {/* Controls */}
                <div className='flex justify-center items-center gap-7 mt-10'>
                    <Mic
                        className={`h-12 w-12 p-3 rounded-full transition-colors duration-200 ${isCallActive ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-300 text-gray-600'
                            }`}
                        aria-label="Microphone Status"
                    />
                    <button
                        onClick={endCall}
                        disabled={!isCallActive && callStatus !== 'starting'}
                        className={`h-12 w-12 p-3 rounded-full transition-colors duration-200 ${isCallActive || callStatus === 'starting'
                                ? 'bg-red-500 text-white cursor-pointer hover:bg-red-600'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                        aria-label="End Call"
                    >
                        <X />
                    </button>
                </div>

                {/* Status Display */}
                <h2 className={`mt-6 text-sm text-center font-medium ${callStatus === 'error' ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {getStatusMessage()}
                </h2>
            </div>
        </div>
    );
}

export default StartAgent;