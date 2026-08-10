"use client";

import { TypeTrip } from "@/app/create-new-trip/_components/chatbox";
import { Calendar, Users, Wallet } from "lucide-react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
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

  return (
    <div ref={containerRef} className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h2 className="mb-5 max-w-4xl text-2xl text-black dark:text-white md:text-4xl">
          Your trip Itinerary to{" "}
          <strong className="text-primary">
            {tripData.destination}
          </strong>{" "}
          is Ready
        </h2>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{tripData.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span>{tripData.budget}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{tripData.group_size}</span>
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
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 md:hidden">
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