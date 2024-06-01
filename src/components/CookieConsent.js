import React from "react";

const CookieConsent = ({ onAccept,onDecline  }) => {
  return (
    <div className="fixed bottom-0 flex flex-row align-center  left-0 right-0 bg-[#DB3748] text-white p-4 z-[40000] px-8">
      <p className="pt-2 text-slate-50 font-semibold">Bu site çerezleri kullanıyor. Kabul ediyor musunuz?</p>
      <button
        className="bg-slate-50 text-[#DB3748] duration-200 hover:bg-green-100 font-semibold  px-4 py-2 rounded ml-4"
        onClick={onAccept}
      >
        Evet
      </button>
      <button
        className="bg-slate-50 text-[#DB3748] duration-200 hover:bg-red-100 font-semibold  px-4 py-2 rounded ml-4"
        onClick={onDecline}
      >
        Hayır
      </button>
    </div>
  );
};

export default CookieConsent;
