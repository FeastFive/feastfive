import React, { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import makarna from "../../images/makarna.png";
import styles from "./HomeSlider.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


export default function HomeSlier() {
    const [windowDimensions, setWindowDimensions] = useState(0);
    const [slideToShow, setSlideToShow] = useState(6);

  const [categories, setCategories] = useState([
    "Kırmızı Et",
    "Beyaz Et",
    "Makarna",
    "Pizza",
    "Kebap",
    "Salata",
    "Tatlı",
    "İçecek",
  ]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth);
      if(window.innerWidth > 1200){
        setSlideToShow(5);
      }
      else if(window.innerWidth < 1200 && window.innerWidth > 900){
        setSlideToShow(4);

      }
      else if(window.innerWidth < 900 && window.innerWidth > 600){
        setSlideToShow(3);

      }
      else if(window.innerWidth < 600 && window.innerWidth > 200){
        setSlideToShow(2);

      }
      console.log(window.innerWidth)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={`h-full w-full pt-12`}>
    <h3 className="pb-8 text-4xl font-semibold">Kitchens</h3>
       <Swiper
        // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={slideToShow}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}

       className={``}
      >
        {categories.map((category) => (
          <SwiperSlide key={category} className=" ">
            <div className="w-32 h-32 rounded-full overflow-hidden  m-auto shadow-xl">
              <img className="object-cover w-full h-full" src={makarna}></img>
            </div>
            <p className="text-center font-semibold pt-1 text-slate-900">{category}</p>
          </SwiperSlide>
        ))}
      </Swiper> 

    </div>
  );
}
