'use client'
import React, { useContext, useEffect } from 'react'
import { Timer, Mic, X } from 'lucide-react'
import { AgentDataContext } from '@/context/AgentDataContext'
import Image from 'next/image'
import Spline from '@splinetool/react-spline'
// import { useUser } from '@/app/provider'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'

function StartAgent() {
    // const { user } = useUser()

    const { agentInfo, setAgentInfo } = useContext(AgentDataContext)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)

    useEffect(() => {
        agentInfo && startCall()
    }, [agentInfo]);

    const startCall = () => {
        let questionList;
        agentInfo?.agentData?.questionList.forEach((item, index) => (
            questionList = item?.question + "," + questionList
        ));
        // console.log("questionList", questionList)

        const assistantOptions = {
            name: "Ava",
            firstMessage: "Hi "+agentInfo?.userName+", how are you?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jeniffer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
                  
        You are AI voice assistant conducting interviews.
        Your job is to ask candidates provided interview questions, assess their responses.
        Begin the conversation with a **friendly** introduction, setting a relaxed yet professional tone. Example: "Hey there! Welcome to your `+agentInfo?.agentData.title+` interview. Let's get started with a few question!"
        Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
        Questions: `+questionList+`
        If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
        "Need a hint? Think about how React tracks component updates!"
        Provide brief, encouraging feedback after each answer. Example:
        "Nice! That's a solid answer."
        Keep the conversation natural and engaging - use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
        After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
        "That was great! You handled some tough questions well. Keep sharpening your skills!"
        End on a positive note:
        "Thanks for chatting! Hope to see you crushing projects soon!"
        Key Guidelines:
        **Be friendly, engaging, and witty**
        **Keep responses short and natural, like a real conversation**
        **Adapt based on the candidate's confidence level**
        **Ensure the interview remains focused on `+agentInfo?.agentData.title+`**
                  `.trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions)

    }

    const endCall=() => {
        vapi.stop()
        setAgentInfo(null)
    }


    return (
        <div className="w-full overflow-x-hidden px-4">
            <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-20 xl:p-32">

                <div className='flex items-center'>
                    <h2 className='font-bold text-xl flex justify-between'>Start Agent
                    </h2>
                    <span className='flex gap-2 items-center'>
                        <Timer />
                        00:00:00
                    </span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>

                    <div className='bg-muted h-[400px] w-full max-w-[400px] rounded-sm flex flex-col gap-3 justify-center items-center'>
                        {/* <Image src={'/agent.png'} alt='agent' width={512} height={512} className=' h-[60px] w-[60px] object-cover rounded-full' />  */}
                        <h2 className="font-bold mt-5">{agentInfo?.agent_id}</h2>
                        <Spline scene="https://prod.spline.design/8SP5oIdMk48a3IVu/scene.splinecode" className='w-[200px] h-[200px] max-w-full overflow-hidden' />
                    </div>

                    <div>
                        <div className='bg-muted h-[400px] w-full max-w-[400px] rounded-sm flex flex-col gap-3 justify-center items-center'>
                            <h2 className="text-2xl bg-primary text-secondery rounded-full p-3 px-5">{agentInfo?.userName[0]}</h2>
                            <h2 className=''>{agentInfo?.userName}</h2>

                            {/* <Image src={user?.picture} alt="dashboard-image" width={40} height={40} className='rounded-full' /> 
                    <br />
                    <h2 className=''>{user?.name}</h2> */}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-7 mt-10'>
                    <Mic className='h-10 w-10 p-2 rounded-full bg-green-500 cursor-pointer' />
                    <AlertConfirmation endConvo={() => endCall()}>
                       <X className='h-10 w-10 p-2 rounded-full bg-red-500 cursor-pointer' /> 
                    </AlertConfirmation>
                    
                    {/* <button className='bg-primary text-secondery px-5 py-2 rounded-sm'>Start</button>
                <button className='bg-muted text-primary px-5 py-2 rounded-sm'>Stop</button> */}
                </div>
                <h2 className="mt-5 text-sm text-muted-foreground text-center">Speaking...</h2>
            </div>
        </div>

    )
}

export default StartAgent