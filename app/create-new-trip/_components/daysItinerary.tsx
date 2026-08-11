import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ItineraryDay } from './chatbox'

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
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border bg-background shadow-sm transition hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src="/placeholder.jpg"
                        alt={activity.place_name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
    
                    {/* Content */}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">
                        {activity.place_name}
                      </h2>
    
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {activity.place_details}
                      </p>
    
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                          <span>{activity.best_time_to_visit}</span>
                        </div>
    
                        <div className="flex items-start gap-2">
                          <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                          <span>{activity.ticket_pricing}</span>
                        </div>
                      </div>
    
                      <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <span className="text-xs text-muted-foreground">
                          {activity.time_travel_each_location}
                        </span>
    
                        <Link
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${activity?.place_name}, ${activity?.place_address}`
                          )}`}
                          target="_blank"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            View
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default DaysItinerary
