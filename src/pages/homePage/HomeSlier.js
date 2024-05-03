import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import makarna from "../../images/makarna.png";
import styles from "./HomeSlider.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { getKitchen } from "../../utils/kitchen/getKitchen";
import { ShowAlert } from "../../components/alert/ShowAlert";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function HomeSlier() {
  const [windowDimensions, setWindowDimensions] = useState(0);
  const [slideToShow, setSlideToShow] = useState(6);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const handleKitchen = async () => {
      try {
        const response = await getKitchen();

        if (response.status === 200) {
          const result = await response.json();
          // console.log(result.kitchens[0].image);
          setCategories(result.kitchens);
        } else if (response.status === 403) {
          ShowAlert(3, "An error occurred while fetching kitchens");
        } else {
          ShowAlert(3, "An error occurred while fetching kitchens");
        }
      } catch (error) {
        console.error("Error:", error);
        ShowAlert(3, "An error occurred while fetching kitchens");
      }
    };
    handleKitchen();
  }, []);
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth);
      if (window.innerWidth > 1400) {
        setSlideToShow(6);
      }
      if (window.innerWidth > 1200) {
        setSlideToShow(5);
      } else if (window.innerWidth < 1200 && window.innerWidth > 1000) {
        setSlideToShow(4);
      } else if (window.innerWidth < 1000 && window.innerWidth > 750) {
        setSlideToShow(3);
      } else if (window.innerWidth < 750 && window.innerWidth > 200) {
        setSlideToShow(2);
      }
      console.log(window.innerWidth);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`h-full w-full pt-12`}>
      <h3 className="pb-8 text-4xl font-semibold">Kitchens</h3>
      {categories && (
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={slideToShow > 3 ? 40 : 30}
          slidesPerView={slideToShow}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className={`px-12 `}
        >
          {categories.map((category) => (
            <SwiperSlide key={category} className=" ">
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden  m-auto shadow-xl">
                <img
                  className="object-cover w-full h-full"
                  src={category.image}
                  alt={category.name}
                ></img>
              </div>
              <p className="text-center font-semibold pt-1 text-slate-900">
                {category.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
