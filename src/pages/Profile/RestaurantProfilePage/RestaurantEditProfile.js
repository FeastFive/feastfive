import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../utils/user/editUser";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { setRestaurant } from "../../../store/slices/restaurantSlice";
import { editRestaurant } from "../../../utils/restaurant/editRestaurant";

export default function RestaurantEditProfile() {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant);

  const [base64Image, setBase64Image] = useState(null); // Define setBase64Image state setter

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [add, setAdd] = useState([]);
  console.log(add);

  const [restaurantObj, setRestaurantObj] = useState({
    id: null,
    restaurantName: "",
    ownerName: "",
    ownerSurname: "",
    email: "",
    image: null,
    adress: { province: "", district: "", addressDescp: "" },
  });

  useEffect(() => {
    if (restaurant?.adress?.province) {
      fetchDistrict(restaurant?.adress?.province);
    }
    setRestaurantObj({
      id: restaurant.id,
      restaurantName: restaurant.restaurantName,
      ownerName: restaurant.ownerName,
      ownerSurname: restaurant.ownerSurname,
      email: restaurant.email,
      image: null,
      adress: {
        province: restaurant.adress?.province,
        district: restaurant.adress?.district,
        addressDescp: restaurant.adress?.addressDescp,
      },
    });
  }, []);
  const handleEditRestaurant = async () => {
    try {
      const response = await editRestaurant(restaurantObj);
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);

        try {
          dispatch(
            setRestaurant({
              restaurantName: result.restaurantName,
              ownerName: result.ownerName,
              ownerSurname: result.ownerSurname,
              adress: result.adress,
            })
          );
          ShowAlert(1, "Saved successfully");
        } catch (dispatchError) {
          console.error("Dispatch Error:", dispatchError);
          ShowAlert(
            3,
            "An error occurred while updating the restaurant in the state"
          );
        }
      } else if (response.status === 404) {
        ShowAlert(3, "User not found");
      } else {
        ShowAlert(3, "An error occurred while editing restaurant");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while editing restaurant");
    }
  };

  const handleFileInputChangeUser = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
        setRestaurantObj({ ...restaurantObj, image: reader.result });
      };
    }
  };

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
    setRestaurantObj({
      ...restaurantObj,
      adress: { ...restaurantObj.adress, province: province },
    });
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

  return (
    <div className="flex flex-col w-full h-auto   justify-center place-items-center">
      <div className="flex flex-row w-auto justify-center gap-3">
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold pb-1">Owner Name: </label>
          <input
            value={restaurantObj.ownerName}
            onChange={(e) =>
              setRestaurantObj({ ...restaurantObj, ownerName: e.target.value })
            }
            className="border-[2px] border-gray-900 pl-2 py-2 w-[220px] rounded-sm shadow-md focus:outline-none"
          ></input>
        </div>

        {/* Surname */}
        <div className="flex flex-col">
          <label className="font-semibold pb-1">Owner Surname: </label>
          <input
            value={restaurantObj.ownerSurname}
            onChange={(e) =>
              setRestaurantObj({
                ...restaurantObj,
                ownerSurname: e.target.value,
              })
            }
            className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none"
          ></input>
        </div>
      </div>

      {/* Email And Image */}

      <div className="flex flex-col">
        <label className="font-semibold pb-1 pt-3">Restaurant Name: </label>
        <input
          value={restaurantObj.restaurantName}
          onChange={(e) =>
            setRestaurantObj({
              ...restaurantObj,
              restaurantName: e.target.value,
            })
          }
          className="border-2 border-gray-900 pl-2 py-2 mb-4 w-[450px] rounded-sm shadow-md focus:outline-none"
        ></input>
        <label className="font-semibold pb-1 pt-3">Email: </label>
        <input
          value={restaurantObj.email}
          className="border-2 border-gray-900 pl-2 py-2 mb-4 w-[450px] rounded-sm shadow-md focus:outline-none"
          disabled
        ></input>
      </div>
      <div className="flex flex-col lg:flex-row justify-center place-items-center px-4 lg:px-[15%] gap-12"></div>
      <div className="flex flex-col w-auto h-auto  pt-4">
        <div className="flex flex-row w-auto justify-center gap-3">
          {/* Province */}
          <div className="flex flex-col">
            <label className="font-semibold pb-1">Province: </label>
            <select
              className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none "
              id="address"
              value={restaurantObj.adress?.province ?? ""}
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
            <label className="font-semibold pb-1">District: </label>
            <select
              className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none"
              id="ilce"
              value={restaurantObj.adress.district}
              onChange={(e) =>
                setRestaurantObj({
                  ...restaurantObj,
                  adress: { ...restaurantObj.adress, district: e.target.value },
                })
              }
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
          <input
            value={restaurantObj.adress.addressDescp ?? ""}
            onChange={(e) =>
              setRestaurantObj({
                ...restaurantObj,
                adress: {
                  ...restaurantObj.adress,
                  addressDescp: e.target.value,
                },
              })
            }
            className="border-2 border-gray-900 pl-2 py-2 w-[450px] rounded-sm shadow-md focus:outline-none"
          ></input>
        </div>
        <label className="font-semibold pb-1 pt-1">Image</label>

        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-500 border-2 border-slate-200 px-4 py-4 rounded-md shadow-md cursor-pointer duration-200
file:mr-4 file:py-2 file:px-4
file:cursor-pointer
file:rounded-md file:border-0
file:text-sm file:font-semibold
file:bg-[#db3748] file:bg-opacity-20 file:text-[#db3748] file:duration-200
hover:file:bg-opacity-40
"
          onChange={handleFileInputChangeUser}
        />
        {/* Save */}
      </div>
      <button
        onClick={handleEditRestaurant}
        className="bg-gray-900 mt-4 w-[450px] rounded-sm shadow-md hover:bg-gray-700 duration-200 ease cursor-pointer py-2 text-slate-50 "
      >
        Save
      </button>
    </div>
  );
}
