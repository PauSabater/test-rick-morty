import { getApiUrl, getHomePageApiData } from '@/utils/utils'
import styles from './cardsCharacterList.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useApiCall } from '@/hooks/useCallApi'
import { ICardCharacter } from '@/components/Card/Card'
import { fetchAllCharacters } from '@/utils/apiCalls'
import { InputsCharactersList } from '@/components/InputsCharactersList/InputsCharactersList'




/**
 * Renderiza una lista de Cards con la información de los personajes
 *
 * @param {string}         props.srcImage      - src para la imagen
 * @param {string}         props.name          - Nombre para el personaje
 */
export default async function Page() {

    const apiData = await fetchAllCharacters()

    return (
        <>
            <InputsCharactersList inputsData={apiData} />
        </>
    )
}