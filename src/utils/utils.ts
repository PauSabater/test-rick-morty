

export const getSlugFromName = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, '-')
}

export const getNameFromSlug = (slug: string): string => {
    return slug.replace(/-/g, ' ')
}

export const getApiUrl = (path: string): string => {
    return `https://rickandmortyapi.com/api/${path}`
}