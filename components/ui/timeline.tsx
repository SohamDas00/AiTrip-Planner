"use client";

import { TypeTrip } from "@/app/create-new-trip/_components/chatbox";
import { Calendar, Users, Wallet } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  tripData,
}: {
  data: TimelineEntry[];
  tripData: TypeTrip;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [destinationPhoto, setDestinationPhoto] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    if (tripData?.destination) {
      axios
        .post("/api/googlePhoto", { placeName: tripData.destination })
        .then((res) => {
          if (isMounted && res.data?.photoUrl) {
            setDestinationPhoto(res.data.photoUrl);
          }
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [tripData?.destination]);

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height]
  );

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  );

  const pathname = usePathname();
  const isCreateNewTrip = pathname === "/create-new-trip";

  return (
    <div ref={containerRef} className="w-full">
      {/* Destination Hero Banner & Header */}
      <div className={`mb-6 md:mb-10 ${isCreateNewTrip ? "ml-0" : "ml-0 md:ml-20"}`}>
        <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-3xl overflow-hidden border shadow-sm mb-4 bg-muted">
          <Image
            src={destinationPhoto || "/placeholder.jpg"}
            alt={tripData.destination || "Destination"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            onError={() => setDestinationPhoto("/placeholder.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 md:p-7">
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">Your Custom Itinerary</span>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow-sm mt-1">
              Trip to {tripData.destination}
            </h2>

            <div className="flex flex-wrap gap-2 sm:gap-4 text-white text-xs sm:text-sm mt-3 font-medium">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{tripData.duration}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Wallet className="h-4 w-4 text-green-400" />
                <span>{tripData.budget}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Users className="h-4 w-4 text-blue-400" />
                <span>{tripData.group_size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-7xl pb-20"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-8"
          >
            {/* LEFT SIDE */}
            <div className="sticky top-30 z-40 hidden self-start md:flex md:w-[25%] md:shrink-0">
              <div className="relative flex w-full items-start">
                {/* Timeline dot */}
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black">
                  <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
                </div>

                {/* Title */}
                <h3 className="pl-14 text-xl font-bold text-neutral-500 md:text-2xl">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative w-full min-w-0 md:w-[75%]">
              {/* Mobile title */}
              <h3 className="mb-3 md:mb-4 block text-left text-lg font-bold text-neutral-500 md:hidden">
                {item.title}
              </h3>

              {item.content}
            </div>
          </div>
        ))}

        {/* Timeline line */}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute left-5 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-700 md:left-[18%]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};