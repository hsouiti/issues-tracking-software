import {ToastContainer, toast, ToastContentProps} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface MessageProps {
  message?: string | undefined;
  type?: string | undefined;
}

export const useToastMessage = (
  message: string | undefined,
  type?: 'info' | 'success' | 'warning' | 'error' | undefined
) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    type,
    toastId: 'toastId',
  });
};
