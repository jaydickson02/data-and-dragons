
export default function Alert(props) {

    let colour = props.colour;

    let buttonStyles = `inline-flex items-center px-1 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-${colour}-600 hover:bg-${colour}-500 focus:outline-none focus:border-${colour}-700 focus:shadow-outline-${colour} active:bg-${colour}-700 transition ease-in-out duration-150 w-8 h-8`

    //let classStyles = `fixed top-2 left-1/4 w-1/2 bg-${colour}-50 rounded border border-${colour}-400 text-${colour}-800 text-sm p-4 justify-between flex items-center`

    let classStyles = `fixed top-2 left-1/4 w-1/2 bg-${colour}-50 rounded border border-${colour}-400 text-${colour}-800 text-sm p-4 justify-between flex items-center`

        return(
            <div class={classStyles}>
            <div>
            <div class="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
                />
            </svg>
            <p>
                <span class="font-bold mr-1">{props.title}</span>
                <span class="font-bold mr-1">-</span>
                {props.message}
            </p>
            </div>
        </div>
        <div>

            <button type="button" class={buttonStyles} onClick={props.show}>
            
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>

            </button>

        </div>
        </div>
        )
}