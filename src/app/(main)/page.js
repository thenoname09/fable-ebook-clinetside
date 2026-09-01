import FeaturedEbooksSection from "@/components/FeaturedEbooksSection";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <FeaturedEbooksSection ></FeaturedEbooksSection>
    </div>
  );
}
