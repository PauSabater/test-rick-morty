import { CardsCharacterList, ICardsCharacter } from "@/components/CardsList/CardsList"
import { getApiUrl, getHomePageApiData } from "@/utils/utils"
import { ICardCharacter } from "@/components/Card/Card"
import { queryBasicCharacterInfo } from "@/utils/queries"
import { getApiGraphQlData } from "@/utils/apiCalls"


export default async function Home() {
    const apiData = await getApiGraphQlData(queryBasicCharacterInfo(1))

    return (
        <>
            {/* <pre>{JSON.stringify(apiData.data.characters.results)}</pre> */}
            <CardsCharacterList
                cardsData={apiData.data.characters.results}
            />
        </>
    )
}