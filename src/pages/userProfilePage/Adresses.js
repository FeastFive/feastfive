import React, { useEffect, useState } from "react";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { useSelector } from "react-redux";

export default function Adresses() {
  const user = useSelector((state) => state.user);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedProvinces, setSelectedProvinces] = useState({});
  const [selectedDistricts, setSelectesDistricts] = useState(null);
  const [adressName, setAdressName] = useState("");
  const [adressDescp, setAdressDescp] = useState("");

  useEffect(() => {
    // Verileri API'den çekiyoruz
    fetch("https://turkiyeapi.dev/api/v1/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data); // API'den gelen verileri state'e kaydediyoruz
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function selectingProvince(province) {
    setSelectedProvinces(province);
    fetchDistrict(province);
  }

  function fetchDistrict(province) {
    console.log("girdi" + province);
    fetch(`https://turkiyeapi.dev/api/v1/provinces?name=${province}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0].districts);
        setDistricts(data.data[0].districts); // API'den gelen verileri state'e kaydediyoruz
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function saveAdress(){
    if(selectedProvinces && selectedDistricts && adressName && adressDescp){
      let newAdress = {"id":user.id,"adress":{"adressName":adressName, "province":selectedProvinces,"districts":selectedDistricts,"addresDescp":adressDescp}}
      console.log(newAdress)
      ShowAlert(1,"Succesfully added adress.")

    }
    else{
      ShowAlert(2,"Fill the blanks !")
    }
   
  }
  return (
    <div className="flex flex-col lg:flex-row justify-center place-items-center px-4 lg:px-[15%] gap-12">
      <div className="flex flex-col w-auto h-auto ">
        <div className="flex flex-col pb-3">
          <label className="font-semibold pb-1 pt-3">Adress Name: </label>
          <input onChange={(e) => setAdressName(e.target.value)} className="border-2 border-gray-900 pl-2 py-2 w-[450px] rounded-sm shadow-md focus:outline-none"></input>
        </div>

        <div className="flex flex-row w-auto justify-center gap-3">
          {/* Province */}
          <div className="flex flex-col">
            <label className="font-semibold pb-1">Province: </label>
            <select
              className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none "
              id="address"
              value={selectedProvinces ?? "Choose Province"}
              onChange={(e) => selectingProvince(e.target.value)}
            >
              <option value="text-xl font-semibold">Seçiniz</option>
              {provinces.map((address, index) => (
                <option
                  className="py-1 text-lg"
                  key={index}
                  value={address.name}
                >
                  {address.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="font-semibold pb-1">Surname: </label>
            <select
              className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none"
              id="ilce"
              value={selectedDistricts}
              onChange={(e) => setSelectesDistricts(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {districts.map((dist, index) => (
                <option key={index} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col pb-3">
          <label className="font-semibold pb-1 pt-3">
            Address Description:{" "}
          </label>
          <input onChange={(e)=> setAdressDescp(e.target.value)} className="border-2 border-gray-900 pl-2 py-2 w-[450px] rounded-sm shadow-md focus:outline-none"></input>
        </div>

        {/* Save */}

        <button onClick={()=> saveAdress()} className="bg-gray-900 mt-4 w-[450px] rounded-sm shadow-md hover:bg-gray-700 duration-200 ease cursor-pointer py-2 text-slate-50 ">
          Save
        </button>
      </div>

      <div className="flex flex-col w-auto h-[340px] overflow-y-scroll relative px-8 gap-4 pb-8">
        <h3 className="text-2xl font-semibold pb-4 sticky top-0 bg-[#FFFFFF]">
          Your Adresses
        </h3>
      
       {[1,2,3].map((e)=>(
        <div>
        <h1 className="px-2 text-xl fontsemibold pb-2 font-semibold">Üniversitem</h1>
        <div className="flex flex-col border-2 px-4 py-2 rounded-md border-gray-800 hover:bg-gray-100 duration-200 ease cursor-pointer ">
          <div className="flex flex-row">
            <h3 className="-font-semibold text-lg mr-2">Bursa</h3>
            <h3 className="-font-semibold text-lg mr-2">Mudanya</h3>
          </div>

          <div>Dikyamaç Sokak Yeşil Vadi Evleri A blok Kat 4 No 9</div>
        </div>
      </div>
       ))}
      </div>
    </div>
  );
}

/**
 
 <div className='flex justify-center place-items-center'>
        <div className="flex flex-col px-12 pt-6 gap-3 w-[500px] ">
      <h3 className="text-xl font-semibold pb-1">Adres</h3>
      <div className="flex flex-row">
      <h1 className="text-md font-semibold border-2 px-2 py-1 border-gray-800 w-[200px]">Adress Name </h1>
      <input placeholder='adres başlığı' className='w-full'></input>

      </div>
      <div className="flex flex-row">
        <h1 className="text-md font-semibold border-2 px-2 py-1 border-gray-800 w-[110px]">Province: </h1>
        <select
        className="w-[200px] border-2 border-l-0 focus:outline-none pl-3 py-1 border-gray-800"
          id="address"
          value={selectedProvinces ?? "Seç lan"}
          onChange={(e) => selectingProvince(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {provinces.map((address, index) => (
            <option key={index} value={address.name}>
              {address.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row">
      <h1 className="text-md font-semibold border-2 px-2 py-1 border-gray-800 w-[110px]">District: </h1>

        <select 
        className="w-[200px] border-2 border-l-0 focus:outline-none pl-3 py-1 border-gray-800"
          id="ilce"
          value={selectedDistricts}
          onChange={(e) => setSelectesDistricts(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {districts.map((dist, index) => (
            <option key={index} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>
      </div>
    </div>
      </div>

 */
