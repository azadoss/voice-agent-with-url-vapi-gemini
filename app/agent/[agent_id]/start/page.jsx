'use client'

import React, { useContext, useEffect, useState } from 'react';
import { Timer, Mic, X } from 'lucide-react';
import { AgentDataContext } from '@/context/AgentDataContext';
// import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation'; // Make sure this path is correct

function StartAgent() {
    const { agentInfo, setAgentInfo } = useContext(AgentDataContext);

    // State for Vapi instance, call status, and errors
    const [vapiInstance, setVapiInstance] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true); // Track Vapi SDK init
    const [callStatus, setCallStatus] = useState('idle'); // idle, starting, started, stopping, ended, error
    const [lastError, setLastError] = useState(null);
    // You might want state for call duration timer as well

    // --- Initialize Vapi SDK Instance ---
    useEffect(() => {
        console.log("Initializing Vapi SDK...");
        const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

        if (!vapiPublicKey) {
            console.error("VAPI Public Key is missing. Ensure NEXT_PUBLIC_VAPI_PUBLIC_KEY is set.");
            setLastError({ errorMsg: "Configuration Error: VAPI key missing." });
            setCallStatus('error');
            setIsInitializing(false);
            return;
        }

        try {
            const vapi = new Vapi(vapiPublicKey);
            setVapiInstance(vapi);

            // --- Attach Event Listeners ---
            vapi.on('call-start', () => {
                console.log('Vapi Event: call-start');
                setCallStatus('started');
                setLastError(null);
            });

            vapi.on('call-end', () => {
                console.log('Vapi Event: call-end');
                setCallStatus('ended');
                // Optionally reset agent info here if the call ends unexpectedly or normally
                // setAgentInfo(null);
            });

            vapi.on('speech-start', () => console.log('Vapi Event: speech-start'));
            vapi.on('speech-end', () => console.log('Vapi Event: speech-end'));

            vapi.on('message', (message) => {
                console.log('Vapi Event: message', message);
                // You can handle messages here (e.g., update transcript display)
            });

            vapi.on('error', (error) => {
                console.error('Vapi Event: error', error); // Log the full error object
                setLastError(error); // Store the error object
                setCallStatus('error');
                // Potentially stop the call explicitly if a critical error occurs
                // vapi.stop();
            });

            setIsInitializing(false); // Mark initialization as complete
            console.log("Vapi SDK Initialized and listeners attached.");

        } catch (initError) {
            console.error("Failed to initialize Vapi SDK:", initError);
            setLastError({ errorMsg: "SDK Initialization Failed.", error: initError });
            setCallStatus('error');
            setIsInitializing(false);
        }


        // --- Cleanup Function ---
        return () => {
            console.log("Cleaning up Vapi instance...");
            if (vapiInstance) {
                 // Check if vapiInstance was successfully set before trying to stop
                vapiInstance.stop(); // Ensure call is stopped on component unmount or re-render
                // Vapi SDK might not have explicit removeAllListeners.
                // Re-initializing on mount/unmount is a common pattern.
            }
            setVapiInstance(null); // Clear the instance from state
            setCallStatus('idle'); // Reset status on cleanup
            setIsInitializing(true); // Reset init status
            console.log("Vapi cleanup complete.");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount


    // --- Effect to Start the Call ---
    useEffect(() => {
        // Only attempt to start if:
        // - Vapi is initialized (not initializing)
        // - We have a Vapi instance
        // - We have agentInfo
        // - The call is currently idle (not already starting/started/etc.)
        if (!isInitializing && vapiInstance && agentInfo && callStatus === 'idle') {
            console.log("Attempting to start call with agentInfo:", agentInfo);
            startCall(vapiInstance); // Pass the instance
        } else {
            // Log why call isn't starting (optional for debugging)
            console.log(`Call not starting: isInitializing=${isInitializing}, vapiInstance=${!!vapiInstance}, agentInfo=${!!agentInfo}, callStatus=${callStatus}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agentInfo, vapiInstance, callStatus, isInitializing]); // Dependencies


    // --- Function to Start the Call ---
    const startCall = (vapi) => {
        if (!agentInfo?.agentData?.questionList || agentInfo.agentData.questionList.length === 0) {
            console.error("Cannot start call: Agent data or question list is missing or empty.");
            setLastError({ errorMsg: "Agent data or question list missing." });
            setCallStatus('error');
            return;
        }

        // Corrected questionList generation
        const questionList = agentInfo.agentData.questionList
            .map(item => item?.question) // Get the question text
            .filter(Boolean)           // Remove any null/undefined entries
            .join('; ');               // Join with semicolon and space (or just ', ')

        if (!questionList) {
             console.error("Cannot start call: Failed to generate question list string.");
             setLastError({ errorMsg: "Failed to generate question list." });
             setCallStatus('error');
             return;
        }

        const assistantOptions = {
            name: agentInfo?.agentData?.name || "Ava", // Use name from agent data or default
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

**Key Constraints:**
* Stick to the provided questions in order.
* Do NOT provide feedback on the correctness of answers during the interview.
* End the call gracefully after the concluding remarks.
`.trim(),
                    },
                ],
            },
             // Optional: Add other Vapi options like recording, metadata, etc. if needed
             // recordingEnabled: true,
             // metadata: { userId: user?.id, interviewId: agentInfo?.agentData?.id } // Example
        };

        console.log("Starting Vapi call with options:", assistantOptions);
        setLastError(null); // Clear previous errors
        setCallStatus('starting');
        try {
            vapi.start(assistantOptions);
        } catch (startError) {
             console.error("Error invoking vapi.start:", startError);
             setLastError({ errorMsg: "Failed to initiate call start.", error: startError });
             setCallStatus('error');
        }
    };

    // --- Function to End the Call ---
    const endCall = () => {
        if (vapiInstance && (callStatus === 'started' || callStatus === 'starting')) {
            console.log("Stopping Vapi call manually via UI.");
            setCallStatus('stopping'); // Indicate stopping process
            vapiInstance.stop();
            // The 'call-end' event listener should eventually set status to 'ended'
            setAgentInfo(null); // Reset agent info context
        } else {
            console.log("Cannot stop call: No active instance or call not in progress.");
            // If call ended unexpectedly, just reset context
             if (callStatus !== 'started' && callStatus !== 'starting') {
                 setAgentInfo(null);
             }
        }
    };

    // --- Render Logic ---
    const getStatusMessage = () => {
        switch (callStatus) {
            case 'idle': return 'Ready to start...';
            case 'starting': return 'Connecting...';
            case 'started': return 'Speaking...';
            case 'stopping': return 'Ending call...';
            case 'ended': return 'Call ended.';
            case 'error': return `Error: ${lastError?.errorMsg || JSON.stringify(lastError)}`;
            default: return 'Status unknown';
        }
    };

    const isCallActive = callStatus === 'starting' || callStatus === 'started';

    if (isInitializing) {
        return <div className="container mx-auto p-4 text-center">Loading Vapi SDK...</div>; // Basic loading state
    }

    if (!agentInfo) {
         // Handle state where agentInfo is null (e.g., after call ends or before selection)
         return <div className="container mx-auto p-4 text-center">Please select an agent to start.</div>;
    }

    return (
        <div className="w-full overflow-x-hidden px-4">
            <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 xl:p-32">

                <div className='flex items-center justify-between mb-5'> {/* Added justify-between and margin */}
                    <h2 className='font-bold text-xl'>Agent Call</h2>
                    <span className='flex gap-2 items-center text-sm text-muted-foreground'>
                        <Timer className='h-4 w-4'/>
                        {/* Placeholder for timer - Implement actual timer logic if needed */}
                        00:00:00
                    </span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                    {/* Agent Display */}
                    <div className='bg-muted h-[350px] md:h-[400px] w-full max-w-[400px] rounded-lg flex flex-col gap-3 justify-center items-center p-4 mx-auto'>
                        <h2 className="font-semibold text-lg mb-2">{agentInfo?.agentData?.name || 'Ava'}</h2>
                         {/* Using Spline for agent visualization */}
                        <Spline
                            scene="https://prod.spline.design/8SP5oIdMk48a3IVu/scene.splinecode"
                            style={{ width: '200px', height: '200px', maxWidth: '100%', overflow: 'hidden' }}
                         />
                        <p className="text-sm text-muted-foreground mt-2">{agentInfo?.agentData?.title || 'Interview'}</p>
                    </div>

                     {/* User Display */}
                    <div className='bg-muted h-[350px] md:h-[400px] w-full max-w-[400px] rounded-lg flex flex-col gap-3 justify-center items-center p-4 mx-auto'>
                        {/* Use user?.picture if integrating useUser */}
                        {/* <Image src={user?.picture || '/default-avatar.png'} alt="User" width={60} height={60} className='rounded-full mb-2' /> */}
                        {/* Fallback/Initial display */}
                        <div className="text-3xl bg-primary text-secondary rounded-full w-16 h-16 flex items-center justify-center mb-2">
                            {agentInfo?.userName ? agentInfo.userName[0].toUpperCase() : '?'}
                        </div>
                        <h2 className='font-semibold text-lg'>{agentInfo?.userName || 'User'}</h2>
                        {/* Display user?.name if available */}
                        {/* <p className='text-sm text-muted-foreground'>{user?.email}</p> */}
                    </div>
                </div>

                {/* Controls */}
                <div className='flex justify-center items-center gap-7 mt-10'>
                    <Mic
                        className={`h-12 w-12 p-3 rounded-full transition-colors duration-200 ${
                            isCallActive ? 'bg-green-500 text-white animate-pulse' : 'bg-gray-300 text-gray-600'
                        }`}
                        aria-label="Microphone Status"
                    />
                    <AlertConfirmation
                        endConvo={endCall}
                        disabled={!isCallActive && callStatus !== 'starting'} // Disable if not starting or started
                    >
                       {/* The AlertConfirmation likely wraps its children in a button/trigger */}
                       <X
                            className={`h-12 w-12 p-3 rounded-full transition-colors duration-200 ${
                                isCallActive || callStatus === 'starting'
                                ? 'bg-red-500 text-white cursor-pointer hover:bg-red-600'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                            aria-label="End Call"
                        />
                    </AlertConfirmation>
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