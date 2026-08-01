import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_component/hero";
import { Carousal } from "./_component/carousal";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousal />
    </>
  );
}
