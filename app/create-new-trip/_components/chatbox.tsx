'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import EmptyBox from './emptyBox'
import BudgetUi from './budgetUi'
import GroupSize from './groupSize'
import Duration from './duration'
import Final from './final'


type TypeMessage = {
    role: string,
    content: string,
    ui?:string,
}

const Chatbox = () => {
    const [messages, setMessages] = useState<TypeMessage[]>([])
    const [userInput, setUserInput] = useState<string>();
    const [loading, setLoading] = useState(false);

    const onSend = async () => {
        setLoading(true);
        if (!userInput?.trim()) return;
        setUserInput('');

        const newMsg: TypeMessage = {
            role: "user",
            content: userInput,
        };

        const updatedMessages = [...messages, newMsg];

        // Update UI immediately
        setMessages(updatedMessages);

        // Send the exact same array to the server
        const result = await axios.post("/api/aimodel", {
            messages: updatedMessages,
        });

        // Add AI response
        setMessages([
            ...updatedMessages,
            {
                role: "assistant",
                content: result.data.resp,
                ui: result.data.ui,
            },
        ]);
        console.log(result.data);
        console.log(result.data.ui);
        setLoading(false);
    }

    const generateUI=(ui:string)=>{
        if(ui=='groupSize'){
            return <GroupSize onselectOption={(v:string)=>setUserInput(v)}/>
        }
        else if(ui=='budget'){
            return <BudgetUi onselectOption={(v:string)=>setUserInput(v)}/>
        }
        else if(ui=='TripDuration'){
            return <Duration onselectOption={(v:string)=>setUserInput(v)}/>
        }
        else if(ui=='Final'){
            return <Final/>
        }
        return null;
    }

    return (
        <div className='h-[75vh] flex flex-col'>
            {/* display message */}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.length == 0 && <EmptyBox onSelectOption={(value: string) => setUserInput(value)}/>}
                {messages.map((msg: TypeMessage, index) => (
                    msg.role == 'user' ?
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {msg.content}
                            </div>
                        </div>
                        :
                        <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg'>
                                {msg.content}
                                {generateUI(msg.ui ??'')}

                            </div>
                        </div>
                ))}
                {loading && <div className='flex justify-start mt-2'>
                    <div className='max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg'>
                        <Loader className='animate-spin text-primary' />
                    </div>
                </div>}
            </section>
            <section className=''>
                <div className='border h-20 shadow rounded-3xl p-2 relative'>
                    <Textarea
                        placeholder="Typing..."
                        className='w-full bg-transparent border-none resize-none focus-visible:ring-0 shadow-none '
                        value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    <Button size={'icon'} className='absolute bottom-4 right-4' onClick={() => onSend()}>
                        <Send />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox
