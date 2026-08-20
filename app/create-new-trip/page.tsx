import { auth } from '@clerk/nextjs/server'
import Chatbox from './_components/chatbox'
import Itinerary from './_components/itinerary'

const CreateNewTrip = async () => {
  // const { isAuthenticated, userId } = await auth()

  // console.log("SERVER AUTH:", {
  //   isAuthenticated,
  //   userId,
  // })

  // if (!isAuthenticated) {
  //   return <div>You are not authenticated</div>
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
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