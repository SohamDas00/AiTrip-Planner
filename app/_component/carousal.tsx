"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function Carousal() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destination to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data = [

  {

    category: "Paris, France",

    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",

    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",

    // content: <DummyContent />,

  },

  {

    category: "New York, USA",

    title: "Experience NYC – Times Square, Central Park, Broadway",

    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // content: <DummyContent />,

  },

  {

    category: "Tokyo, Japan",

    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",

    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // content: <DummyContent />,

  },

  {

    category: "Rome, Italy",

    title: "Walk through History – Colosseum, Vatican, Roman Forum",

    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // content: <DummyContent />,

  },

  {

    category: "Dubai, UAE",

    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",

    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // content: <DummyContent />,

  },

  {

    category: "India",
    title: "Experience Incredible India – Taj Mahal, Kerala & Himalayas",

    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // content: <DummyContent />,

  },

];


