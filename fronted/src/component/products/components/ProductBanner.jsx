import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export const ProductBanner = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full h-full mt-5 ">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={image} alt="Banner" className="w-full h-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
