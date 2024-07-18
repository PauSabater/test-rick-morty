import { ICardCharacter } from "@/components/Card/Card"


export const getSlugFromName = (name: string): string => {
    return name?.toLowerCase().replace(/\s/g, '-') || ''
}

export const getNameFromSlug = (slug: string): string => {
    return slug.replace(/-/g, ' ')
}

export const getApiUrl = (path: string): string => {
    return `https://rickandmortyapi.com/api/${path}`
}

export function observeBottomIntersection(element: HTMLElement, callback: Function, options = {}) {
    const defaultOptions = {
        threshold: 0, // Trigger callback when any part of the target element is visible
        root: null, // Use the viewport as the root
        rootMargin: '0px' // No margin around the viewport
    };

    // Merge default options with user-provided options
    const mergedOptions = {...defaultOptions, ...options};

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                const elementBottom = entry.target.getBoundingClientRect().bottom
                const viewportBottom = window.innerHeight;

                if (elementBottom <= viewportBottom) {
                    callback(entry)
                }
            }
        });
    }, mergedOptions);

    observer.observe(element);
}

export const getHomePageApiData = (data: any): ICardCharacter[] => {
    if (data)
        return data.results.map((character: any) => {
            return {
                srcImage: character.image,
                nameCharacter: character.name,
                id: character.id
            }}
        ) as ICardCharacter[]

    else return []
}

export const setModePersist = (value: string)=> {
    localStorage.setItem('mode', value)
}

export const getModePersist = (): string => {
    return localStorage?.getItem('mode') || ''
}