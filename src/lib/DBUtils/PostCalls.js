
const fetcher = async (url, options) => {
    const res = await fetch(url, options)
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  }


export const PostToDB = async (url, data) => {


    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = url;

    // Form the request for sending data to the server.
    const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
        'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
    };

    try {
        const result = await fetcher(endpoint, options);
        return result
    }
    catch (error) {
        console.error(error)
        throw error
    }

}  