import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createNotification = ({}) => {

    return(
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        />
    )
};

export default createNotification;