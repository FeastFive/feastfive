import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../utils/user/editUser";
import { ShowAlert } from "../../../components/alert/ShowAlert";
import { setUsers } from "../../../store/slices/userSlice";

export default function Editprofile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  const handleEditUser = async () => {
    try {
      const response = await editUser(userObj);
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);

        try {
          dispatch(setUsers({ name: result.name, surname: result.surname }));
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
