import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Sliders {
  id: number;
  url: string;
}
interface SliderProps {
  sliderList: Sliders[];
}
const Slider = ({ sliderList }: SliderProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList?.map((slider, i) => (
          <CarouselItem key={i}>
            <Image
              unoptimized={true}
              src={slider?.url}
              alt="slider"
              width={1000}
              height={400}
              className="w-full h-[200px] md:h-[420px] object-cover rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
