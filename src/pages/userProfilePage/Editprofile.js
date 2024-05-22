import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../utils/user/editUser";
import { ShowAlert } from "../../components/alert/ShowAlert";
import { setUser } from "../../store/slices/userSlice";

export default function Editprofile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [base64Image, setBase64Image] = useState(null); // Define setBase64Image state setter

  const [userObj, setUserObj] = useState({
    id: null,
    name: "",
    surname: "",
    email: "",
    image: null,
  });

  useEffect(() => {
    setUserObj({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  }, []);

  const handleFileInputChangeUser = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
        setUserObj({ ...userObj, image: reader.result });
      };
    }
  };
  const handleEditUser = async () => {
    try {
      const response = await editUser(userObj);
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);

        try {
          dispatch(setUser({ name: result.name, surname: result.surname }));
          ShowAlert(1, "Saved successfully");
        } catch (dispatchError) {
          console.error("Dispatch Error:", dispatchError);
          ShowAlert(
            3,
            "An error occurred while updating the user in the state"
          );
        }
      } else if (response.status === 404) {
        ShowAlert(3, "User not found");
      } else {
        ShowAlert(3, "An error occurred while editing user");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowAlert(3, "An error occurred while editing user");
    }
  };

  console.log(userObj);
  return (
    <div className="flex flex-col w-full h-auto   justify-center place-items-center">
      <div className="flex flex-row w-auto justify-center gap-3">
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold pb-1">Name: </label>
          <input
            value={userObj.name}
            onChange={(e) => setUserObj({ ...userObj, name: e.target.value })}
            className="border-[2px] border-gray-900 pl-2 py-2 w-[220px] rounded-sm shadow-md focus:outline-none"
          ></input>
        </div>

        {/* Surname */}
        <div className="flex flex-col">
          <label className="font-semibold pb-1">Surname: </label>
          <input
            value={userObj.surname}
            onChange={(e) =>
              setUserObj({ ...userObj, surname: e.target.value })
            }
            className="border-2 border-gray-900 pl-2 py-2 rounded-sm w-[220px] focus:outline-none"
          ></input>
        </div>
      </div>

      {/* Email And Image */}

      <div className="flex flex-col">
        <label className="font-semibold pb-1 pt-3">Email: </label>
        <input
          value={userObj.email}
          onChange={(e) => setUserObj({ ...userObj, email: e.target.value })}
          className="border-2 border-gray-900 pl-2 py-2 mb-4 w-[450px] rounded-sm shadow-md focus:outline-none"
          disabled
        ></input>

        {/* <label className="font-semibold pb-1 pt-3">Image</label>

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
        /> */}
      </div>

      <button
        onClick={handleEditUser}
        className="bg-gray-900 mt-4 w-[450px] rounded-sm shadow-md hover:bg-gray-700 duration-200 ease cursor-pointer py-2 text-slate-50 "
      >
        Save
      </button>
    </div>
  );
}
