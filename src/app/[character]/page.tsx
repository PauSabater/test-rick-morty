import { getNameFromSlug, getSlugFromName } from "@/utils/utils"


export async function generateStaticParams() {
    console.log("IEI STATIC")
    const apiResponse = await fetch('https://rickandmortyapi.com/api/character').then((res) => res.json())

    console.log(apiResponse)

    return apiResponse.results.map((character: any) => ({
        character: getSlugFromName(character.name)
    }))
  }

export default async function Page({ params }: { params: { character: string } }) {

    const apiResponse = await fetch(`https://rickandmortyapi.com/api/character/?name=${getNameFromSlug(params.character)}`).then((res) => res.json())


    return (
        <>
            <pre>{JSON.stringify(apiResponse)}</pre>
        <div>My Post: {params.character}</div>
        </>
    )
}