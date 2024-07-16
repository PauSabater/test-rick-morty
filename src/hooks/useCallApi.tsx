import { getApiGraphQlData } from "@/utils/apiCalls"
import { useCallback, useState } from "react"

/**
 * Custom hook to make an API call
 *
 * @return {Object} - Object with the data, loading state, error and the function to make the API call
 */
export const useApiCall = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const callApi = useCallback(async (query: string) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('https://rickandmortyapi.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query
                }),
              })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            const result = await response.json()

            setData(query.includes('characters') ? result.data.characters.results : result)
        }
        catch (err) {
            setError(err as React.SetStateAction<null>)
        }
        finally {
            setLoading(false)
        }
    }, [])

    return { data, loading, error, callApi }
}