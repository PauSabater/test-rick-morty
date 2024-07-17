import { CardsCharacterList } from "@/components/CardsList/CardsList"
import { queryBasicCharacterInfo } from "@/utils/queries"
import { getApiGraphQlData } from "@/utils/apiCalls"
import { PageContainer } from "@/components/PageContainer/PageContainer"


export default async function Home() {
    const queryData = queryBasicCharacterInfo(`page: 1`)
    const apiData = await getApiGraphQlData(queryData)

    return (
        <PageContainer>
            <CardsCharacterList
                cardsData={apiData.data.characters.results}
            />
        </PageContainer>
    )
}