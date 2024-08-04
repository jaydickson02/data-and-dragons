import { useEffect } from 'react';

export default function Alert(props) {
    let colour = props.colour;

    let buttonStyles = `inline-flex items-center px-1 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-${colour}-600 hover:bg-${colour}-500 focus:outline-none focus:border-${colour}-700 focus:shadow-outline-${colour} active:bg-${colour}-700 transition ease-in-out duration-150 w-8 h-8`;

    let classStyles = `fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 bg-${colour}-100 rounded border border-${colour}-400 text-${colour}-800 text-sm p-4 justify-between flex items-center shadow-lg`;

    useEffect(() => {
        const timer = setTimeout(() => {
            props.show();
        }, 5000); // Automatically hide after 5 seconds
        return () => clearTimeout(timer);
    }, [props]);

    return (
        <div className={classStyles}>
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                    />
                </svg>
                <p>
                    <span className="font-bold mr-1">{props.title}</span>
                    <span className="font-bold mr-1">-</span>
                    {props.message}
                </p>
            </div>
            <div>
                <button type="button" className={buttonStyles} onClick={props.show}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black" // Cross is black
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}