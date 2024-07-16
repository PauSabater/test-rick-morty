

export const queryBasicCharacterInfo = (pageNumber = 1) => {
    return `{
        characters(page: ${pageNumber}) {
            results {
                id
                name
                image
            }
        }
    }`
}

export const queryCharacterEpisodes = (id: string): string => {
    return `{
        character(id: "${id}") {
            episode {
                name
            }
        }
    }`
}