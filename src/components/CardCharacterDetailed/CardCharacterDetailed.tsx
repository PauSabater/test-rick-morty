import styles from './card.module.scss'
import { useEffect, useRef, useState } from 'react'

interface ICardCharacter {
    srcImage: string,
    name: string,
    status: 'Alive' | 'Dead' | 'unknown',
    species: string,
    type: string,
    gender: string
}


/**
 * Renders an Card with an image and an optionally displayed text
 *
 * @param {string}         props.description      - Text describing the image
 * @param {string}         props.srcImage         - Source for the image
 */
export function CardCharacter({

 }: string) {


    return (
        <></>
    )
}