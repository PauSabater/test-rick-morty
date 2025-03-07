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
    const refFiltersContainer = useRef<HTMLDivElement>(null)

    // guarda el número de la página actual para "infinite scroll"
    const [currentPage, setCurrentPage] = useState<number | 'filters' | 'search'>(1)
    // guarda el número de la página actual para "infinite scroll" en un ref para observer
    const stateRefPage = useRef(currentPage)
    // datos para renderizar
    const [cardsDataState, setCardsData] = useState<ICardCharacter[]>(cardsData)
    // hook para llamar a la API
    const { loading, data, callApi } = useApiCall()

    // nombre de la página para los filtros, en vez de un número
    const nameStateFilters = 'filters'
    const nameStateSearch = 'search'

    // Estados para los filtros y búsqueda
    const [selectedStatus, setSelectedStatus] = useState<TStatus | null>(null)
    const [selectedGender, setSelectedGender] = useState<TGender | null>(null)
    const [selectedSpecies, setSelectedSpecies] = useState<TSpecies | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')

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
                if (entry.isIntersecting && entry.intersectionRatio > 0
                    && stateRefPage.current !== nameStateFilters && stateRefPage.current !== nameStateSearch) {
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

        if (currentPage !== nameStateSearch) {
            setSearchValue('')
        }
        if (currentPage !== 1 && currentPage !== nameStateFilters && currentPage !== nameStateSearch) {
            const pageToQuery = currentPage === 0 ? 1 : currentPage
            callApi(queryBasicCharacterInfo(`page: ${pageToQuery}`))

        // si los datos son respuesta de los filtros o búsqueda, se resetean los datos actuales
        // para mostrar los nuevos datos
        } else if (currentPage === nameStateFilters || currentPage === nameStateSearch) {
            setCardsData([])
        }
    }, [currentPage])

    /**
     * Actualiza el estado del array de datos de las cards para mostrar los nuevos datos
     */
    useEffect(() => {
        if (data) {
            setCardsData([
                ...cardsDataState,
                ...data
            ])
        }
    }, [JSON.stringify(data)])

    /**
     * Actualiza datos a mostrar llamando a la api en función de los filtros actualizados
     */
    useEffect(() => {

        const areFiltersEmpty = selectedStatus === null && selectedGender === null && selectedSpecies === null

        // resetear la búsqueda porque ya no se mostrará
        setSearchValue('')

        // Este caso se da cuando se han deselecionado todos los filtros
        if (areFiltersEmpty && currentPage === nameStateFilters) {
            setCardsData(cardsData)
            setCurrentPage(1)
            return
        }
        if (areFiltersEmpty) return

        // contruir los filtros para la query
        const statusFilter = `status: "${selectedStatus || ''}"`
        const genderFilter = `gender: "${selectedGender || ''}"`
        const speciesFilter = `species: "${selectedSpecies || ''}"`
        const filters = [statusFilter, genderFilter, speciesFilter].filter((filter) => filter !== '').join(', ')
        const queryApi = queryBasicCharacterInfo(`filter: { ${filters} }`)

        setCardsData([])
        setCurrentPage('filters')
        callApi(queryApi)

    }, [selectedStatus, selectedGender, selectedSpecies])

    /**
     * Salta a una página determinada, reseteando los filtros
     *
     * @param {number} num - Número de la página a la que saltar
     * @returns {void}
     */
    const jumpToPage = (num: number): void=> {
        uncheckFiltersInputs()
        const pageToJumpTo: number = num >= 20 ? (num / 20) + 1 : 0
        setCardsData([])
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
        setSearchValue(value)
        callApi(queryBasicCharacterInfo(`filter: { name: "${value}" }`))
        setCurrentPage(nameStateSearch)
        // resetear los filtros porque solo se mostrará la búsqueda
        uncheckFiltersInputs()
    }

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
     * Devuelve el texto de los filtros seleccionados
     *
     * @returns {string} - Texto de los filtros seleccionados
     * @returns {void}
     */
    const getFilterText = (): string=> {
        let text =  `Characters with `

        if (selectedSpecies) {
            text += `${selectedSpecies} species`
        }
        if (selectedGender) {
            const separator = selectedGender && selectedStatus
                ? ',' : selectedStatus
                    ? ' and' : ''
            text += `${separator} ${selectedGender} gender`
        }
        if (selectedStatus) {
            const separator = selectedGender || selectedSpecies
                ? ' and'
                : ''
            text += `${separator} ${selectedStatus} status`
        }

        return text
    }

    /**
     * Reinicia los inputs de los filtros
     *
     * @returns {void}
     */
    const uncheckFiltersInputs = (): void=> {
        if (!refFiltersContainer.current) return
        const elsInputs: NodeListOf<HTMLInputElement> = refFiltersContainer.current.querySelectorAll('input[type="checkbox"]')

        elsInputs.forEach((el: HTMLInputElement) => {
            el.checked = false
        })
    }

    // const reserSearchInput = (): void=> {
    //     setSearchValue('')
    // }

    /**
     * Devuelve el título de la lista de personajes en función de los filtros seleccionados
     *
     * @returns {string} - Título de la lista de personajes
     * @returns {void}
     */
    const getTextTitle = (): string => {

        if (currentPage === nameStateFilters
            && (selectedStatus !== null || selectedGender  !== null || selectedSpecies !== null)) {
            return getFilterText()

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

        } else if (currentPage === nameStateSearch) {
            return `Characters containing "${searchValue}"`
        }

        return 'All characters'
    }

    /**
     * Reinicia los filtros y actualiza los datos para mostrar los datos ya cargados de la primera página
     *
     * @returns {void}
     */
    const onButtonRestartClick = (): void=> {
        uncheckFiltersInputs()
        setSelectedStatus(null)
        setSelectedGender(null)
        setSelectedSpecies(null)
        setCurrentPage(1)
        setCardsData(cardsData)
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
            <div ref={refFiltersContainer}>
                <Filters
                    onButtonRestartClick={onButtonRestartClick}
                    onSearchInputSubmit={onSearchInputSubmit}
                    onSelectionUpdate={updateFilters}
                    searchInputValue={searchValue}
                />
            </div>
            <ul ref={refContainer} className={styles.container}>
                {   // Renderizar las cards con la información de los personajes
                    cardsDataState.map((card, i) => {
                        return <CardCharacter {...card} key={`card-${i}`}/>
                    })
                }
                {   // Mostrar loader de cards mientras se cargan los datos
                    loading ? <CardsLoader/> : <></>
                }
                {   // Mostrar mensaje de no resultados si no hay datos y no se está cargando
                    cardsDataState.length === 0 && !loading
                        ? <p className={styles.noResults}>No results found</p>
                        : <></>
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