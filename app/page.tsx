import Hero from "./_component/hero";
import { Carousal } from "./_component/carousal";
import { Features } from "./_component/features";
import { Footer } from "./_component/footer";
import { HowItWorks } from "./_component/howItWork";
import FAQComponent from "./_component/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Carousal />
      <FAQComponent/>
      <Footer />
    </>
  );
}