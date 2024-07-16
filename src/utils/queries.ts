

export const queryBasicCharacterInfo = (params: string) => {
    return `{
        characters(${params}) {
            results {
                id
                name
                image
            }
        }
    }`
}

//page: ${pageNumber}

export const queryCharacterEpisodes = (id: string): string => {
    return `{
        character(id: "${id}") {
            episode {
                name
            }
        }
    }`
}