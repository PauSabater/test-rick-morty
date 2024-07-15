import Link from 'next/link'
import styles from './cardCharacter.module.scss'
import { useEffect, useRef, useState } from 'react'
import { getSlugFromName } from '@/utils/utils'

export interface ICardCharacter {
    srcImage: string,
    nameCharacter: string
}


/**
 * Renders an Card with an image and the name of the character
 *
 * @param {string}         props.srcImage      - Text describing the image
 * @param {string}         props.name          - Source for the image
 */
export function CardCharacter({
    srcImage,
    nameCharacter
 }: ICardCharacter) {


    return (
        <Link
            href={getSlugFromName(nameCharacter)}
            className={styles.containerCard}
        >
            <img
                src={srcImage}
                alt={nameCharacter}
                className={styles.image}
            />
            <p className={styles.text}>{nameCharacter}</p>
        </Link>
    )
}