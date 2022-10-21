import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToastMessage = (
  message: string | undefined,
  type?: 'info' | 'success' | 'warning' | 'error' | undefined
) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: type === 'error' ? 5000 : 2000,
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
