import React from "react";

const CookieConsent = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 flex flex-row align-center  left-0 right-0 bg-[#DB3748] text-white p-4 z-[40000] px-8">
      <p className="pt-2 text-slate-50 font-semibold">
        This site uses cookies. Do you accept ?
      </p>
      <button
        className="bg-slate-50 text-[#DB3748] duration-200 hover:bg-green-100 font-semibold  px-4 py-2 rounded ml-4"
        onClick={onAccept}
      >
        Yes
      </button>
      <button
        className="bg-slate-50 text-[#DB3748] duration-200 hover:bg-red-100 font-semibold  px-4 py-2 rounded ml-4"
        onClick={onDecline}
      >
        No
      </button>
    </div>
  );
};

export default CookieConsent;
