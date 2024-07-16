import { getApiGraphQlData } from "@/utils/apiCalls"
import { queryCharacterEpisodes } from "@/utils/queries"
import { useCallback, useState } from "react"

/**
 * Custom hook to make an API call
 *
 * @return {Object} - Object with the data, loading state, error and the function to make the API call
 */
export const useApiCallCompareCharactersEpisodes = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const callApi = useCallback(async (firstId: string, secondId: string) => {
        setData(null)
        setLoading(true)
        setError(null)

        if (firstId === '' || secondId === '') {
            setLoading(false)
            return
        }

        const fetchEpisodes = async (id: string) => {
            return await fetch('https://rickandmortyapi.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: queryCharacterEpisodes(id)
                })
            })
        }

        try {
            // Fetch para obtener los episodios de cada personaje
            const respFirstCharacter = await fetchEpisodes(firstId)
            const respSecondCharacter = await fetchEpisodes(secondId)

            if (!respFirstCharacter.ok) throw new Error(`HTTP error! status: ${respFirstCharacter.status}`)
            if (!respSecondCharacter.ok) throw new Error(`HTTP error! status: ${respSecondCharacter.status}`)

            const resultFirstCharacter = await respFirstCharacter.json()
            const resultSecondCharacter = await respSecondCharacter.json()

            // arrays con nombres de episodios
            const episodesFirstCharacter = resultFirstCharacter.data.character.episode.map(
                (episode: {name: string})=> {return episode.name}
            )
            const episodesSecondCharacter = resultSecondCharacter.data.character.episode.map(
                (episode: {name: string})=> {return episode.name}
            )

            // Filtar los episodios en común
            const commonEpisodes = episodesFirstCharacter.filter(
                (name: string) => episodesSecondCharacter.includes(name)
            )

            setData(commonEpisodes)
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