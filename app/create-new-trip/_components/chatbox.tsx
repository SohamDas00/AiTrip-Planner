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
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from "uuid";
import { useUser } from '@clerk/nextjs'


type TypeMessage = {
    role: string,
    content: string,
    ui?: string,
}

export type TypeTrip = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    hotels: Hotel[],
    itinerary: ItineraryDay,
}

export type Hotel = {
  description: string;
  geo_coordinates: {
    latitude:number,
    longitude:number,
  };
  hotel_address: string;
  hotel_image_url: string;
  hotel_name: string;
  price_per_night: string;
  rating: number;
};

export type Activity = {
  best_time_to_visit: string;
  geo_coordinates: {
    latitude:number,
    longitude:number,
  };
  place_address: string;
  place_details: string;
  place_image_url: string;
  place_name: string;
  ticket_pricing: string;
  time_travel_each_location: string;
};

export type ItineraryDay = {
  activities: Activity[];
  best_time_to_visit_day: string;
  day: number;
  day_plan: string;
};


const Chatbox = () => {
    const [messages, setMessages] = useState<TypeMessage[]>([])
    const [userInput, setUserInput] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [tripDetails, setTripDetails] = useState<TypeTrip>();
    const [tripGenerated,setTripGenerated]=useState(false);
    const { user } = useUser();
    const currentUser = useQuery(
        api.user.getUserByEmail,
        user?.primaryEmailAddress?.emailAddress
            ? {
                email: user.primaryEmailAddress.emailAddress,
            }
            : "skip"
    );
    const saveTripDetails = useMutation(api.tripDetails.createTripDetails)

    const onSend = async () => {
        setLoading(true);
        if (!userInput?.trim()) { setLoading(false); return; }
        const input = userInput;
        setUserInput('');

        const newMsg: TypeMessage = { role: "user", content: input };
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);

        try {
            const result = await axios.post("/api/aimodel", {
                messages: updatedMessages,
            });

            const newMessages = [
                ...updatedMessages,
                {
                    role: "assistant",
                    content: result.data.resp,
                    ui: result.data.ui,
                },
            ];

            setMessages(newMessages);

            // If all questions are completed
            if (result.data.ui === "Final" ) {
                if(tripGenerated) return ;
                setTripGenerated(true);

                const tripResult = await axios.post(
                    "/api/generate-trip",
                    result.data.tripDetails
                );

                console.log("Generated Trip");

                console.log(tripResult.data);

                setTripDetails(tripResult?.data?.trip_plan)

                if (!currentUser) {
                    console.log("Current user not loaded");
                    return;
                }

                const uid = uuidv4();
                await saveTripDetails({
                    tripId: uid,
                    tripDetails: tripResult?.data?.trip_plan,
                    uid: currentUser._id,
                })
            }
        } catch (err) {
            setMessages([
                ...updatedMessages,
                { role: "assistant", content: "Something went wrong. Please try again.", ui: "error" },
            ]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const generateUI = (ui: string) => {
        if (ui == 'groupSize') {
            return <GroupSize onselectOption={(v: string) => setUserInput(v)} />
        }
        else if (ui == 'budget') {
            return <BudgetUi onselectOption={(v: string) => setUserInput(v)} />
        }
        else if (ui == 'TripDuration') {
            return <Duration onselectOption={(v: string) => setUserInput(v)} />
        }
        else if (ui == 'Final') {
            return <Final disabled={!tripDetails} />
        }
        return null;
    }

    return (
        <div className='h-[75vh] flex flex-col'>
            {/* display message */}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.length == 0 && <EmptyBox onSelectOption={(value: string) => setUserInput(value)} />}
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
                                {generateUI(msg.ui ?? '')}

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
                    disabled={loading || tripGenerated}
                        placeholder="Typing..."
                        className='w-full bg-transparent border-none resize-none focus-visible:ring-0 shadow-none '
                        value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    <Button size={'icon'} disabled={loading ||tripGenerated} className='absolute bottom-4 right-4' onClick={() => onSend()}>
                        <Send />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox
