import isMobile from "is-mobile";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => import("react-responsive-carousel").then((module) => module.Carousel),
  {
    ssr: false,
  }
);

const MyCarousel = () => {
  const showIndicators = !isMobile();

  return (
    <>
      {typeof window !== "undefined" && (
        <Carousel
          showStatus={false}
          showThumbs={false}
          className="home_carousel"
          showIndicators={showIndicators}
        >
          <div>
            <Image
              src="https://angular.pixelstrap.com/multikart/assets/images/slider/1.jpg"
              alt="Image 1"
              width={3000}
              height={800}
              quality={100}
              className="car_img"
              priority
            />
          </div>
          <div>
            <Image
              src="https://angular.pixelstrap.com/multikart/assets/images/slider/2.jpg"
              alt="Image 2"
              width={3000}
              height={800}
              quality={100}
              className="car_img"
            />
          </div>
          {/* Add more slides as needed */}
        </Carousel>
      )}
    </>
  );
};

export default MyCarousel;
