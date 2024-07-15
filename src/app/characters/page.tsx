import { getSlugFromName } from "@/utils/utils"


export async function generateStaticParams() {
    console.log("IEI STATIC")
    const apiResponse = await fetch('https://rickandmortyapi.com/api/character').then((res) => res.json())

    console.log(apiResponse)

    return apiResponse.results.map((character: any) => ({
        slug: 'hello',
    }))
  }

export default function Page({ params }: { params: { slug: string } }) {
    return <div>My Post: {params.slug}</div>
}