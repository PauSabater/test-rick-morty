import Image from "next/image"
import styles from "./page.module.css"
import { Header } from "@/components/Header/Header"
import { CardsCharacterList, ICardsCharacter } from "@/components/CardsCharacterList/CardsCharacterList"

async function getData() {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const response = res.json()

    return response
}

export default async function Home() {
    const data = await getData()
    const cardsData: ICardsCharacter = data.results.map((character: any) => {
        return {
            srcImage: character.image,
            nameCharacter: character.name
        }}
    ) as ICardsCharacter

    return (
        <>
            <CardsCharacterList cardsData={cardsData as any}/>
        </>
    )
}