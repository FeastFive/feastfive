import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import Salata from "../../images/salata.png";

const Profile = () => {
  const [base64Image, setBase64Image] = useState(null); // Define setBase64Image state setter

  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
    }
  };

  const [readyPassword, setReadyPassword] = useState(true);
  const [readyEmail, setReadyEmail] = useState(true);
  const [inputsMissingEmail, setInputsMissingEmail] = useState(false);
  const [inputsMissingPassword, setInputsMissingPassword] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: restaurant.ownerName,
    ownerSurname: restaurant.ownerSurname,
    restaurantName: restaurant.restaurantName,
    email: restaurant.email,
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const restaurantUser = (
    <div className={styles.mainContainer}>
      <div className={styles.leftCart}>
        <CgProfile className={styles.profileIconNoPhoto} />
        {/* <img src={Salata} alt="" className={styles.profileIconWithPhoto} /> */}
        <div className="w-full">
          <label className="block">
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
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>
      <div className={styles.rightCart}>
        <div className={styles.nameLabel}>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Owner Name:</div>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Owner Surname:</div>
            <input
              type="text"
              name="ownerSurname"
              value={formData.ownerSurname}
              onChange={handleChange}
              className={styles.inputFill}
            />
          </label>
        </div>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Restaurant Name:</div>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Email:</div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <button className={styles.subbmitButton} onClick={() => {}}>
          Save
        </button>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>New Password:</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>New Password Confirm:</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputFill}
          />
        </label>
        <button className={styles.subbmitButton} onClick={() => {}}>
          Change Password
        </button>
      </div>
    </div>
  );

  const handleFileInputChangeUser = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
    }
  };

  const [readyPasswordUser, setReadyPasswordUser] = useState(true);
  const [readyEmailUser, setReadyEmailUser] = useState(true);
  const [inputsMissingEmailUser, setInputsMissingEmailUser] = useState(false);
  const [inputsMissingPasswordUser, setInputsMissingPasswordUser] =
    useState(false);
  const [userFormData, setUserFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
  });
  const handleChangeUser = (event) => {
    setUserFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const normalUser = (
    <div className={styles.mainContainer}>
      <div className={styles.leftCart}>
        <CgProfile className={styles.profileIconNoPhoto} />
        {/* <img src={Salata} alt="" className={styles.profileIconWithPhoto} /> */}
        <div className="w-full">
          <label className="block">
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
          </label>
        </div>
      </div>
      <div className={styles.rightCart}>
        <div className={styles.nameLabel}>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Name:</div>
            <input
              type="text"
              name="name"
              value={userFormData.name} // Use userFormData for normal user's name
              onChange={handleChangeUser}
              className={styles.inputFill}
            />
          </label>
          <label className={styles.inputLabel}>
            <div className={styles.inputTitle}>Surname:</div>
            <input
              type="text"
              name="surname"
              value={userFormData.surname} // Use userFormData for normal user's surname
              onChange={handleChangeUser}
              className={styles.inputFill}
            />
          </label>
        </div>

        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>Email:</div>
          <input
            type="text"
            name="email"
            value={userFormData.email}
            onChange={handleChangeUser}
            className={styles.inputFill}
          />
        </label>
        <button className={styles.subbmitButton} onClick={() => {}}>
          Save
        </button>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>New Password:</div>
          <input
            type="password"
            name="password"
            value={formData.password} // Is this intended to be userFormData.password?
            onChange={handleChangeUser}
            className={styles.inputFill}
          />
        </label>
        <label className={styles.inputLabel}>
          <div className={styles.inputTitle}>New Password Confirm:</div>
          <input
            type="password"
            name="password"
            value={formData.password} // Is this intended to be userFormData.password?
            onChange={handleChangeUser}
            className={styles.inputFill}
          />
        </label>
        <button className={styles.subbmitButton} onClick={() => {}}>
          Change Password
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />

      <div>
        {user.isLogin ? normalUser : null}
        {restaurant.isLogin ? restaurantUser : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
