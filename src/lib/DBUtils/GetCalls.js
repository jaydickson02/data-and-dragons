import useSWR from 'swr'

// const fetcher = url => fetch(url).then(res => res.json())

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}


export function getCampaigns(id){
        const { data, error, isLoading } = useSWR(`/api/get/campaigns/${id}`, fetcher)
       
        return {
          campaigns: data,
          campaignsIsLoading: isLoading,
          campaignsError: error
        }
      

}

export function getNotes(id){
    const { data, error, isLoading } = useSWR(`/api/get/notes/${id}`, fetcher, { refreshInterval: 100 })
       
        return {
          notes: data,
          notesIsLoading: isLoading,
          notesError: error
        }

}

export function getCharacters(id){
    const { data, error, isLoading } = useSWR(`/api/get/characters/${id}`, fetcher, { refreshInterval: 1000 })
       
        return {
          characters: data,
          charactersIsLoading: isLoading,
          charactersError: error
        }

}

