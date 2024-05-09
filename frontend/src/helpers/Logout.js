import { SuccessToast } from "./Toast";
import { Modal } from "../components/Modal";

export const LogOut = () => {
   
    localStorage.removeItem("token");
  
    
    SuccessToast("Logged out.")
};
