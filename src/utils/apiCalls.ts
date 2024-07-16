import { queryBasicCharacterInfo } from "./queries"


export async function getApiGraphQlData(query: any) {
    const res = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })
    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

export async function fetchAllCharacters() {
    const totalPages = 826 / 20

    const allCharacters = []

    for (let i = 1; i <= totalPages; i++) {
        const response = await getApiGraphQlData(queryBasicCharacterInfo(i))
        const characters = response.data.characters.results

        if (response) {
            allCharacters.push(...characters)
        }
    }

    return allCharacters
}