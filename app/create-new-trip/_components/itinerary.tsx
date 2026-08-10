import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import { Clock, ExternalLink, Star, Ticket, Wallet } from 'lucide-react';
import Image from 'next/image';
import { title } from 'process';
import React from 'react'

const TRIP_DATA = {
  "budget": "Luxury",
  "destination": "London",
  "duration": "3 Days",
  "group_size": "Friends",
  "hotels": [
    {
      "description": "The Savoy, an iconic luxury hotel on the Strand, offers opulent rooms, world-class dining, and a prime location near Covent Garden and the Thames.",
      "geo_coordinates": {
        "latitude": 51.5136,
        "longitude": -0.1276
      },
      "hotel_address": "Strand, London WC2R 0EZ, United Kingdom",
      "hotel_image_url": "https://example.com/savoy.jpg",
      "hotel_name": "The Savoy",
      "price_per_night": "£1,200",
      "rating": 4.8
    },
    {
      "description": "The Savoy, an iconic luxury hotel on the Strand, offers opulent rooms, world-class dining, and a prime location near Covent Garden and the Thames.",
      "geo_coordinates": {
        "latitude": 51.5136,
        "longitude": -0.1276
      },
      "hotel_address": "Strand, London WC2R 0EZ, United Kingdom",
      "hotel_image_url": "https://example.com/savoy.jpg",
      "hotel_name": "The Savoy",
      "price_per_night": "£1,200",
      "rating": 4.8
    },
    {
      "description": "The Savoy, an iconic luxury hotel on the Strand, offers opulent rooms, world-class dining, and a prime location near Covent Garden and the Thames.",
      "geo_coordinates": {
        "latitude": 51.5136,
        "longitude": -0.1276
      },
      "hotel_address": "Strand, London WC2R 0EZ, United Kingdom",
      "hotel_image_url": "https://example.com/savoy.jpg",
      "hotel_name": "The Savoy",
      "price_per_night": "£1,200",
      "rating": 4.8
    }
  ],
  "itinerary": [
    {
      "activities": [
        {
          "best_time_to_visit": "10:00 AM – 4:00 PM",
          "geo_coordinates": {
            "latitude": 51.5054,
            "longitude": -0.0852
          },
          "place_address": "Southwark, London SE1 1TL, United Kingdom",
          "place_details": "One of London's oldest and largest food markets, offering a wide range of fresh produce, artisanal foods, and street food stalls.",
          "place_image_url": "https://example.com/borough.jpg",
          "place_name": "Borough Market",
          "ticket_pricing": "Free entry",
          "time_travel_each_location": "30 minutes from hotel by taxi"
        },
        {
          "best_time_to_visit": "7:30 PM – 10:30 PM",
          "geo_coordinates": {
            "latitude": 51.5125,
            "longitude": -0.1277
          },
          "place_address": "11 Upper St Martin's Ln, London WC2H 9FB, United Kingdom",
          "place_details": "A Bombay-style café serving delicious Indian cuisine in a stylish setting.",
          "place_image_url": "https://example.com/dishoom.jpg",
          "place_name": "Dishoom Covent Garden",
          "ticket_pricing": "£25 per person (includes starter, main, dessert)",
          "time_travel_each_location": "15 minutes walk"
        },
        {
          "best_time_to_visit": "7:00 PM – 9:30 PM",
          "geo_coordinates": {
            "latitude": 51.5175,
            "longitude": -0.14
          },
          "place_address": "127 Ledbury Rd, London W11 2AQ, United Kingdom",
          "place_details": "Two Michelin-starred restaurant offering contemporary European cuisine.",
          "place_image_url": "https://example.com/ledbury.jpg",
          "place_name": "The Ledbury",
          "ticket_pricing": "£120 per person (includes tasting menu)",
          "time_travel_each_location": "20 minutes by taxi"
        }
      ],
      "best_time_to_visit_day": "Morning to early evening",
      "day": 1,
      "day_plan": "Explore iconic London food markets and classic British cuisine."
    },
    {
      "activities": [
        {
          "best_time_to_visit": "10:00 AM – 5:00 PM",
          "geo_coordinates": {
            "latitude": 51.4975,
            "longitude": -0.1336
          },
          "place_address": "St. James's, London SW1A 2AA, United Kingdom",
          "place_details": "Historic market offering gourmet foods, cheeses, and delicacies.",
          "place_image_url": "https://example.com/stjames.jpg",
          "place_name": "St. James's Market",
          "ticket_pricing": "Free entry",
          "time_travel_each_location": "25 minutes by taxi"
        },
        {
          "best_time_to_visit": "7:00 PM – 10:00 PM",
          "geo_coordinates": {
            "latitude": 51.512,
            "longitude": -0.133
          },
          "place_address": "34 Rupert St, London W1D 4JQ, United Kingdom",
          "place_details": "Restaurant serving food from modern-day Jerusalem with influences from Southern Spain, North Africa, and the Levant.",
          "place_image_url": "https://example.com/palomar.jpg",
          "place_name": "The Palomar",
          "ticket_pricing": "£35 per person (includes starter, main, dessert)",
          "time_travel_each_location": "10 minutes walk"
        },
        {
          "best_time_to_visit": "12:00 PM – 2:30 PM (lunch) or 7:00 PM – 10:30 PM (dinner)",
          "geo_coordinates": {
            "latitude": 51.5135,
            "longitude": -0.149
          },
          "place_address": "9 Conduit St, London W1S 4SJ, United Kingdom",
          "place_details": "Iconic restaurant and art gallery offering a whimsical dining experience.",
          "place_image_url": "https://example.com/sketch.jpg",
          "place_name": "Sketch",
          "ticket_pricing": "£90 per person (includes lunch or dinner menu)",
          "time_travel_each_location": "15 minutes by taxi"
        }
      ],
      "best_time_to_visit_day": "Morning to evening",
      "day": 2,
      "day_plan": "Discover culinary heritage and modern gastronomy across London."
    },
    {
      "activities": [
        {
          "best_time_to_visit": "12:00 PM – 2:30 PM",
          "geo_coordinates": {
            "latitude": 51.505,
            "longitude": -0.119
          },
          "place_address": "1 Southbank, London SE1 9PB, United Kingdom",
          "place_details": "Italian restaurant located on the South Bank with stunning views of the Thames.",
          "place_image_url": "https://example.com/rivercafe.jpg",
          "place_name": "The River Café",
          "ticket_pricing": "£70 per person (includes starter, main, dessert)",
          "time_travel_each_location": "20 minutes by taxi"
        },
        {
          "best_time_to_visit": "6:00 PM – 9:00 PM",
          "geo_coordinates": {
            "latitude": 51.5074,
            "longitude": -0.1278
          },
          "place_address": "Southbank Centre, London SE1 9PB, United Kingdom",
          "place_details": "Luxury cruise offering dinner, live music, and panoramic views of London landmarks.",
          "place_image_url": "https://example.com/cruise.jpg",
          "place_name": "Thames River Cruise",
          "ticket_pricing": "£150 per person (includes dinner and entertainment)",
          "time_travel_each_location": "10 minutes walk"
        },
        {
          "best_time_to_visit": "7:00 PM – 9:30 PM",
          "geo_coordinates": {
            "latitude": 51.513,
            "longitude": -0.133
          },
          "place_address": "68 Royal St, London W1D 4LS, United Kingdom",
          "place_details": "Michelin-starred restaurant offering exquisite French cuisine.",
          "place_image_url": "https://example.com/gordon.jpg",
          "place_name": "Restaurant Gordon Ramsay",
          "ticket_pricing": "£200 per person (includes tasting menu)",
          "time_travel_each_location": "15 minutes by taxi"
        }
      ],
      "best_time_to_visit_day": "Morning to late evening",
      "day": 3,
      "day_plan": "Indulge in luxury dining and culinary experiences with a scenic river cruise."
    }
  ],
  "origin": "Create New Trip"
}

const Itinerary = () => {
  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {TRIP_DATA.hotels.map((hotel, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Hotel Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/placeholder.jpg"
                  alt={hotel.hotel_name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Hotel Details */}
              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {hotel.hotel_name}
                </h2>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {hotel.hotel_address}
                </p>

                {/* Price + Rating */}
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-green-500" />

                    <span className="font-medium">
                      {hotel.price_per_night}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      / night
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant="outline"
                  className="mt-5 w-full rounded-xl"
                >
                  View Hotel
                </Button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    ...TRIP_DATA?.itinerary.map((dayData) => ({
      title: `Day ${dayData?.day}`,
      content: (
        <div>
          <p>Best time :{dayData?.best_time_to_visit_day}</p>
          {dayData?.activities.map((activity,index)=>(
            <div key={index}>
              <Image src={'/placeholder.jpg'} alt='image' height={200} width={300}/>
              <h2>{activity?.place_name}</h2>
              <p>{activity?.place_details}</p>
              <div className='flex gap-2 text-blue-400'>
                <Ticket/>
                {activity?.ticket_pricing}
              </div>
              <div className='flex gap-2 text-yellow-400'>
                <Clock/>
                {activity?.best_time_to_visit}
              </div>
              <Button variant={'outline'}  className='flex gap-2 w-full'>View <ExternalLink/></Button>
            </div>
          ))}
        </div>
      )
    }))
  ];
  return (
    <div className="relative w-full h-[75vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  )
}

export default Itinerary
