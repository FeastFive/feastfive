import React, { useState, useEffect } from 'react';
import { ClockLoader } from 'react-spinners';

export default function Loader({type}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 1200);
    
        return () => clearTimeout(timer);
      }, []);
  return (
    <>
     <div className={`w-full h-full py-32  px-32 absolute left-0 top-0  z-[5000] bg-[#FFFFFF] flex justify-center pt-24 ${isVisible ? '' : 'hidden'}`}>
     <ClockLoader margin={2} speedMultiplier={2} size={70} color="rgba(219, 55, 72, 0.8)" />
   </div>    

  
    </>
  )
}
