import { useEffect } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

export default function Alert(props) {
    let colour = props.colour;

    let classStyles = `fixed top-2 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 bg-${colour}-100 rounded border border-${colour}-400 text-${colour}-800 text-sm p-2 justify-between flex items-center shadow-lg z-50 animate-pop-out cursor-pointer`;

    useEffect(() => {
        const timer = setTimeout(() => {
            props.show();
        }, 5000); // Automatically hide after 5 seconds
        return () => clearTimeout(timer);
    }, [props]);

    return (
        <div className={classStyles} onClick={props.show}>
            <div className="flex items-center">
                <FaExclamationCircle className={`h-4 w-4 mr-2 text-${colour}-800`} />
                <p>
                    <span className="font-bold mr-1">{props.title}</span>
                    <span className="font-bold mr-1">-</span>
                    {props.message}
                </p>
            </div>
        </div>
    );
}