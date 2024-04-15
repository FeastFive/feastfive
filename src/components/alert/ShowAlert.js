import { toast } from "react-toastify";

function ShowAlert(type, message) {
  console.log("SHOW ALERT : ", type, message);
  switch (type) {
    case 1:
      toast.success(`${message}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    case 2:
      toast.warning(`${message}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    case 3:
      toast.error(`${message}`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    default:
      break;
  }
}

export default ShowAlert;
