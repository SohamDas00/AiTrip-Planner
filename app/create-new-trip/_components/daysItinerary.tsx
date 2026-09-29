import React from 'react'
import { ItineraryDay } from './chatbox'
import ActivityCard from './activityCard'

type Props={
    dayData:ItineraryDay
}

const DaysItinerary = ({dayData}:Props) => {
  return (
    <div className="space-y-5">
      {/* Day Summary */}
      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          Best time to explore
        </p>

        <p className="mt-1 font-medium">
          {dayData.best_time_to_visit_day}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          {dayData.day_plan}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {dayData.activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  )
}

export default DaysItinerary
