
const fetcher = async (url, options) => {
    const res = await fetch(url, options)
    if (!res.ok) {
    //   const error = new Error('An error occurred while deleting the data.')
    //   error.info = await res.json()
    //   error.status = res.status
    //   console.log("ITS ME I AM 1")
    //   throw error
    }
    console.log("ITS ME I AM 2")
    return res.json()
  }


export const DeleteFromDB = async (url, data) => {


    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
    
    // Form the request for sending data to the server.
    const options = {
    // The method is POST because we are sending data.
    method: 'DELETE',
    // Tell the server we're sending JSON.
    headers: {
        'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
    };

    try {
        console.log("ITS ME I AM 3")
        const result = await fetcher(url, options);
        return result
    }
    catch (error) {
        console.log("ITS ME I AM 4")
        //console.error(error)
        throw error
    }

}  