import { CardsCharacterList, ICardsCharacter } from "@/components/CardsList/CardsList"
import { getApiUrl, getHomePageApiData } from "@/utils/utils"
import { ICardCharacter } from "@/components/Card/Card"
import { queryBasicCharacterInfo } from "@/utils/queries"
import { getApiGraphQlData } from "@/utils/apiCalls"
import { PageContainer } from "@/components/PageContainer/PageContainer"


export default async function Home() {
    const apiData = await getApiGraphQlData(queryBasicCharacterInfo(`page: 1`))

    return (
        <PageContainer>
            <CardsCharacterList
                cardsData={apiData.data.characters.results}
            />
        </PageContainer>
    )
}