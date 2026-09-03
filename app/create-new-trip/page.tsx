import { auth } from '@clerk/nextjs/server'
import Chatbox from './_components/chatbox'
import Itinerary from './_components/itinerary'

const CreateNewTrip = async () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 p-4 md:p-10">
      <div>
        <Chatbox />
      </div>

      <div>
        <Itinerary />
      </div>
    </div>
  )
}

export default CreateNewTrip