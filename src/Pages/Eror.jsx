
import { useNavigate } from 'react-router-dom';

const Eror= () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background2">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mt-4">Oops! Page not found</p>
                <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
                <button
                    onClick={goBack}
                    className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Eror;
