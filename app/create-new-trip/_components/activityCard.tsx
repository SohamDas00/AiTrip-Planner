'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Activity } from './chatbox'

type Props = {
  activity: Activity
}

const ActivityCard = ({ activity }: Props) => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        const result = await axios.post("/api/googlePhoto", {
          placeName: `${activity.place_name}, ${activity.place_address || ""}`,
        });

        const url = result?.data?.photoUrl;
        if (isMounted && typeof url === "string" && url.length > 0) {
          setPhotoUrl(url);
        }
      } catch (err) {
        console.error("Failed to load activity photo:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (activity?.place_name) {
      fetchPhoto();
    }

    return () => {
      isMounted = false;
    };
  }, [activity?.place_name, activity?.place_address]);

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div>
        {/* Image Container */}
        <div className="relative h-44 w-full overflow-hidden bg-muted">
          <Image
            src={photoUrl || "/placeholder.jpg"}
            alt={activity.place_name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-transform duration-300 hover:scale-105 ${
              isLoading ? "opacity-75 blur-xs" : "opacity-100 blur-0"
            }`}
            onError={() => setPhotoUrl("/placeholder.jpg")}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold line-clamp-1">
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
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-xs text-muted-foreground">
            {activity.time_travel_each_location}
          </span>

          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${activity?.place_name}, ${activity?.place_address || ""}`
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
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
