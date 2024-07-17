import styles from './characterPage.module.scss'
import { CardCharacterDetailed, IPreviousNextCharacter } from "@/components/CardCharacterDetailed/CardCharacterDetailed"
import { LinkBack } from '@/components/LinkBack/LinkBack'
import { LinkNextOrPrevious } from '@/components/LinkNextOrPrevious/LinkNextOrPrevious'
import { PageContainer } from '@/components/PageContainer/PageContainer'
import { getApiUrl, getNameFromSlug, getSlugFromName } from "@/utils/utils"


export async function generateStaticParams() {
    const apiResponse = await fetch('https://rickandmortyapi.com/api/character').then((res) => res.json())

    return apiResponse.results.map((character: any) => ({
        character: getSlugFromName(character.name)
    }))
}

export default async function Page({ params }: { params: { character: string } }) {

    const characterName: string = getNameFromSlug(params.character)
    const urlFetch = getApiUrl(`character/?name=${characterName}`)
    const apiResponse = await fetch(urlFetch).then((res) => res.json())

    if (apiResponse && apiResponse.results && apiResponse?.results[0]) {

        const dataCharacter = apiResponse.results[0]
        const idCharacter = parseInt(apiResponse.results[0].id)

        // Data episode
        const urlEpisode = apiResponse.results[0].episode[0]
        const urlEpisodeFetch = await fetch(urlEpisode).then((res) => res.json())
        const dataEpisode = {
            name: urlEpisodeFetch.name || '',
            airDate: urlEpisodeFetch.air_date || '',
            episode: urlEpisodeFetch.episode || ''
        }

        /**
        * Get the previous and next character
        *
        * @param {string} url                        - URL to fetch the character
        * @returns {Promise<IPreviousNextCharacter>} - The previous or next character
        **/
        const getPreviousNextCharacter = async (url: string): Promise<IPreviousNextCharacter>=> {
            const responseCharacter = await fetch(url).then((res) => res.json())

            return {
                name: responseCharacter?.name || '',
                srcImage: responseCharacter?.image || ''
            }
        }

        const dataPreviousCharacter: IPreviousNextCharacter = (idCharacter > 1)
            ? await getPreviousNextCharacter(getApiUrl(`character/${idCharacter - 1}`))
            : { name: '', srcImage: '' }

        const dataNextCharacter: IPreviousNextCharacter = (idCharacter !== 800)
            ? await getPreviousNextCharacter(getApiUrl(`character/${idCharacter + 1}`))
            : { name: '', srcImage: '' }


        return (
            <PageContainer>
                <div className={styles.pageContainer}>
                    <LinkBack path={'/'} text={'Back to list'} />
                    <CardCharacterDetailed
                        name={dataCharacter.name}
                        srcImage={dataCharacter.image}
                        // description={dataCharacter.planet}
                        planet={dataCharacter.location.name}
                        gender={dataCharacter.gender}
                        status={dataCharacter.status}
                        species={dataCharacter.species}
                        firstEpisode={dataEpisode}
                    />

                    <div className={styles.linkContainer}>
                        <LinkNextOrPrevious
                            path={getSlugFromName(dataPreviousCharacter.name)}
                            text={'Previous'}
                            textLink={dataPreviousCharacter.name}
                            srcImage={dataPreviousCharacter.srcImage}
                        />
                        <LinkNextOrPrevious
                            path={getSlugFromName(dataNextCharacter.name)}
                            text={'Next'}
                            textLink={dataNextCharacter.name}
                            srcImage={dataNextCharacter.srcImage}
                            isNext={true}
                        />
                    </div>
                </div>
            </PageContainer>
        )
    }

    else return (
        <>
            <div className={styles.pageContainer}>
                <p>Character not found</p>
            </div>
        </>
    )
}

export async function generateMetadata({ params }: {params: any}) {
    return {
        title: `${params.character.replace('-', ' ')}`,
        description: `all Rick and Morty characters`
    }
  }