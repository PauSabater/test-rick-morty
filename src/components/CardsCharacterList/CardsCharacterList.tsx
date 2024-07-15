
import { CardCharacter, ICardCharacter } from '../CardCharacter/CardCharacter'
import styles from './cardsCharacterList.module.scss'
import { useEffect, useRef, useState } from 'react'

export interface ICardsCharacter {
    cardsData: ICardCharacter[]
}


/**
 * Renders an Card with an image and the name of the character
 *
 * @param {string}         props.srcImage      - Text describing the image
 * @param {string}         props.name          - Source for the image
 */
export function CardsCharacterList({ cardsData }: ICardsCharacter) {


    return (
        <div className={styles.container}>
            {/* <pre>{JSON.stringify(cardsData)}</pre> */}
            {
                cardsData.map((card) => {
                    return (
                        <CardCharacter
                            srcImage={card.srcImage}
                            nameCharacter={card.nameCharacter}
                        />
                    )
                })
            }
        </div>
    )
}