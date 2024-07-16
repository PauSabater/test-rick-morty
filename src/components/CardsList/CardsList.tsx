'use client'

import { getApiUrl, getHomePageApiData } from '@/utils/utils'
import { CardCharacter, ICardCharacter } from '../Card/Card'
import styles from './cardsList.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useApiCall } from '@/hooks/useCallApi'
import { queryBasicCharacterInfo } from '@/utils/queries'
import { Filters } from '../Filters/Filters'
import { Pagination } from '../Pagination/Pagination'

export interface ICardsCharacter {
    cardsData: ICardCharacter[]
}

/**
 * Renderiza una lista de Cards con la información de los personajes
 *
 * @param {string}         props.srcImage      - src para la imagen
 * @param {string}         props.name          - Nombre para el personaje
 */
export function CardsCharacterList({ cardsData }: ICardsCharacter) {

    const refContainer = useRef<HTMLUListElement>(null)
    const refObserved = useRef<HTMLDivElement>(null)

    // guarda el número de la página actual para "infinite scroll"
    const [currentPage, setCurrentPage] = useState<number>(1)
    // guarda el número de la página actual para "infinite scroll" en un ref para observer
    const stateRefPage = useRef(currentPage)
    // datos para renderizar
    const [cardsDataState, setCardsDataState] = useState<ICardCharacter[]>(cardsData)
    // hook para llamar a la API
    const { loading, data, callApi } = useApiCall()

    /**
     * Añade un observer para detectar cuando el elemento bottom de la pantalla llega al bottom del elemento
     */
    useEffect(() => {
        const options: IntersectionObserverInit = {
            threshold: 0,
            root: null,
            rootMargin: '0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // cuando el elemento es visible y el ratio de intersección es mayor a 0
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    // const elBottom = entry.target.getBoundingClientRect().bottom
                    setCurrentPage(stateRefPage.current + 1)
                }
            })}, options)

        if (refObserved.current) observer.observe(refObserved.current)
    }, [])

    /**
     * Llama a la API para obtener los datos de la página actual
     */
    useEffect(() => {
        stateRefPage.current = currentPage

        if (currentPage > 1) {
            callApi(queryBasicCharacterInfo(`page: ${currentPage}`))
        }
    }, [currentPage])

    /**
     * Actualiza el estado del array de datos de las cards para mostrar los nuevos datos
     */
    useEffect(() => {
        if (data) {
            setCardsDataState([
                ...cardsDataState,
                ...data
            ])
        }
    }, [JSON.stringify(data)])

    const jumpToPage = (num: number)=> {
        const pageToJumpTo: number = (num / 20) + 1
        setCardsDataState([])
        setCurrentPage(pageToJumpTo)
    }

    const CardsLoader = ()=> {
        return (
            Array.from({length: 12}, (_, i) => i).map((_, i) => {
                return <CardCharacter key={`card-${i}`} showSkeleton={true}/>
            }
        ))

    }

    return (
        <>
            <div className={styles.head}>
                <h1 className={styles.title}>All characters</h1>
                <Pagination
                    paginations={[200, 400, 600, 800]}
                    callBackOnBtnClick={jumpToPage}
                />
            </div>
            <Filters />
            <ul ref={refContainer} className={styles.container}>
                {
                    cardsDataState.map((card, i) => {
                        return <CardCharacter {...card} key={`card-${i}`}/>
                    })
                }
                {
                    loading ? <CardsLoader/> : <></>
                }
            </ul>
            <div
                data-display={!loading}
                ref={refObserved}
                className={styles.observed}
            />
        </>
    )
}