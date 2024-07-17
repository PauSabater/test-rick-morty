'use client'

import { CardCharacter, ICardCharacter } from '../Card/Card'
import styles from './cardsList.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useApiCall } from '@/hooks/useCallApi'
import { queryBasicCharacterInfo } from '@/utils/queries'
import { Filters, TGender, TSpecies, TStatus } from '../Filters/Filters'
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
    const [currentPage, setCurrentPage] = useState<number | 'filters'>(1)
    // guarda el número de la página actual para "infinite scroll" en un ref para observer
    const stateRefPage = useRef(currentPage)
    // datos para renderizar
    const [cardsDataState, setCardsDataState] = useState<ICardCharacter[]>(cardsData)
    // hook para llamar a la API
    const { loading, data, callApi } = useApiCall()

    // nombre de la página para los filtros, en vez de un número
    const pageNameFilters = 'filters'

    // Estados para los filtros:
    const [selectedStatus, setSelectedStatus] = useState<TStatus | null>(null)
    const [selectedGender, setSelectedGender] = useState<TGender | null>(null)
    const [selectedSpecies, setSelectedSpecies] = useState<TSpecies | null>(null)

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
                if (entry.isIntersecting && entry.intersectionRatio > 0 && stateRefPage.current !== pageNameFilters) {
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

        if (currentPage !== 1 && currentPage !== pageNameFilters) {
            const pageToQuery = currentPage === 0 ? 1 : currentPage
            callApi(queryBasicCharacterInfo(`page: ${pageToQuery}`))

        // si se los datos son respuesta de los filtros o búsqueda, se resetean los datos actuales
        // para mostrar los nuevos datos
        } else if (currentPage === pageNameFilters) {
            setCardsDataState([])
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

    /**
     * Salta a una página determinada
     *
     * @param {number} num - Número de la página a la que saltar
     * @returns {void}
     */
    const jumpToPage = (num: number): void=> {
        const pageToJumpTo: number = num >= 20 ? (num / 20) + 1 : 0
        setCardsDataState([])
        setCurrentPage(pageToJumpTo)
    }

    /**
     * Renderiza un loader de cards mientras la API carga los datos
     *
     * @returns {JSX.Element} - Loader de cards
     * @returns {void}
     */
    const CardsLoader = ()=> {
        return (
            Array.from({length: 12}, (_, i) => i).map((_, i) => {
                return <CardCharacter key={`card-${i}`} showSkeleton={true}/>
            }
        ))
    }

    /**
     * Llama a la API para obtener los datos de los personajes que coincidan con el string del input
     *
     * @param {string} value - String del input
     * @returns {void}
     */
    const onSearchInputSubmit = (value: string): void=> {
        callApi(queryBasicCharacterInfo(`filter: { name: "${value}" }`))
        setCurrentPage(pageNameFilters)
    }

    /**
     * Actualiza datos a mostrar llamando a la api en función de los filtros actualizados
     */
    useEffect(() => {

        const areFiltersEmpty = selectedStatus === null && selectedGender === null && selectedSpecies === null

        // Este caso se da cuando se han deselecionado todos los filtros
        if (areFiltersEmpty && currentPage === pageNameFilters) {
            setCardsDataState([])
            callApi(queryBasicCharacterInfo(`page: 1`))
            setCurrentPage(1)
            return
        }
        if (areFiltersEmpty) return


        const statusFilter = `status: "${selectedStatus || ''}"`
        const genderFilter = `gender: "${selectedGender || ''}"`
        const speciesFilter = `species: "${selectedSpecies || ''}"`
        const filters = [statusFilter, genderFilter, speciesFilter].filter((filter) => filter !== '').join(', ')
        const queryApi = queryBasicCharacterInfo(`filter: { ${filters} }`)

        setCardsDataState([])
        setCurrentPage('filters')
        callApi(queryApi)

    }, [selectedStatus, selectedGender, selectedSpecies])

    /**
     * Actualiza datos a mostrar en función de los filtros seleccionados
     *
     * @param {string} id - Id del filtro seleccionado
     * @param {boolean} checked - Estado del filtro seleccionado
     * @returns {void}
     */
    const updateFilters = (id: string, checked: boolean): void=> {
        const type: string = id.split('-')[0]
        const value: TGender | TSpecies | TStatus = id.split('-')[1] as TGender | TSpecies | TStatus

        if (type === 'status') {
            setSelectedStatus(checked ? value as TStatus : null)
        } else if (type === 'specie') {
            setSelectedSpecies(checked ? value as TSpecies : null)
        } else if (type === 'gender') {
            setSelectedGender(checked ? value as TGender : null)
        }
    }

    /**
     * Devuelve el título de la lista de personajes en función de los filtros seleccionados
     *
     * @returns {string} - Título de la lista de personajes
     * @returns {void}
     */
    const getTextTitle = (): string => {
        if (selectedStatus !== null || selectedGender  !== null || selectedSpecies !== null) {
            return `Characters with ${
                selectedSpecies ? `${selectedSpecies} species` : ''
                } ${selectedGender ? `${selectedStatus ? ',' : 'and'} ${selectedGender} gender` : ''
                } ${selectedStatus ? `and ${selectedStatus} status` : ''}`
        } else if (typeof currentPage === "number") {
            if (currentPage >= 10 && currentPage < 20 && cardsDataState.length < 200) {
                return 'All characters from number 200'
            }
            if (currentPage >= 20 && currentPage < 30 && cardsDataState.length < 400) {
                return 'All characters from number 400'
            }
            if (currentPage >= 30 && currentPage < 40 && cardsDataState.length < 600) {
                return 'All characters from number 600'
            }
            if (currentPage >= 40 && cardsDataState.length < 800) {
                return 'All characters from number 800'
            }
        }
        return 'All characters'
    }

    /**
     * Reinicia los filtros y la página actual
     *
     * @returns {void}
     */
    const onButtonRestartClick = (): void=> {
        setSelectedStatus(null)
        setSelectedGender(null)
        setSelectedSpecies(null)
        setCurrentPage(1)
    }

    return (
        <>
            <div className={styles.head}>
                <h1 className={styles.title}>{getTextTitle()}</h1>
                <Pagination
                    paginations={[1, 200, 400, 600, 800]}
                    callBackOnBtnClick={jumpToPage}
                />
            </div>
            <Filters
                onButtonRestartClick={onButtonRestartClick}
                onSearchInputSubmit={onSearchInputSubmit}
                onSelectionUpdate={updateFilters}
            />
            <ul ref={refContainer} className={styles.container}>
                {
                    cardsDataState.map((card, i) => {
                        return <CardCharacter {...card} key={`card-${i}`}/>
                    })
                }
                {
                    loading ? <CardsLoader/> : <></>
                }
                {
                    cardsDataState.length === 0 && !loading ? <p className={styles.noResults}>No results found</p> : <></>
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