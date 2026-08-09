import { Timeline } from '@/components/ui/timeline';
import React from 'react'

const TRIP_DATA={
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
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full h-[75vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  )
}

export default Itinerary
