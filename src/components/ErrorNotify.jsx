import { toast } from "react-toastify";

const errorNotify = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

export default errorNotify;
