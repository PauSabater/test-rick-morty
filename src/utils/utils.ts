

export const getSlugFromName = (name: string): string => {
    return name.toLowerCase().replace(/\s/g, '-')
}

export const getNameFromSlug = (slug: string): string => {
    return slug.replace(/-/g, ' ')
}