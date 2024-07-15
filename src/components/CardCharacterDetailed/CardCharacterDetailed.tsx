import { getSlugFromName } from '@/utils/utils'
import { LinkNextOrPrevious } from '../LinkNextOrPrevious/LinkNextOrPrevious'
import styles from './cardCharacterDetailed.module.scss'
import { useEffect, useRef, useState } from 'react'

interface IDataEpisode {
    name: string,
    airDate: string,
    episode: string
}

export interface IPreviousNextCharacter {
    name: string,
    srcImage: string
}

interface ICardCharacter {
    name: string,
    srcImage: string,
    planet: string,
    gender: string,
    species: string,
    status: string,
    firstEpisode: IDataEpisode,
    // nextCharacter: IPreviousNextCharacter,
    // previousCharacter: IPreviousNextCharacter
    // srcImage: string,
    // name: string,
    // status: 'Alive' | 'Dead' | 'unknown',
    // species: string,
    // type: string,
    // gender: string
}


/**
 * Renders an Card with an image and an optionally displayed text
 *
 * @param {string}         props.description      - Text describing the image
 * @param {string}         props.srcImage         - Source for the image
 */
export function CardCharacterDetailed({
    name,
    srcImage,
    planet,
    gender,
    species,
    status,
    firstEpisode,
 }: ICardCharacter) {


    return (
        <>
            <div className={styles.container}>
                <img
                    src={srcImage}
                    alt={name}
                    className={styles.image}
                ></img>
                <div className={styles.infoContainer}>
                    <p className={styles.name}>{name}</p>
                    {/* <p>{description}</p> */}
                    {/* <p>{srcImage}</p> */}
                    <InfoWithIcon
                        srcIcon='planet'
                        intro='Origin'
                        text={planet}
                    />
                    <InfoWithIcon
                        srcIcon='gender'
                        intro='Gender'
                        text={gender}
                    />
                    <InfoWithIcon
                        srcIcon='gender'
                        intro='Species'
                        text={species}
                    />
                    <InfoWithIcon
                        srcIcon='gender'
                        intro='Status'
                        text={status}
                    />
                    <div className={styles.episodeContainer}>
                        <p>First Episode</p>
                        <p className={styles.episodeTitle}>{firstEpisode.name}</p>
                        <p className={styles.episode}>{firstEpisode.episode}</p>
                        <p className={styles.episode}>{firstEpisode.airDate}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const InfoWithIcon = (
    {srcIcon, intro, text}:
    {srcIcon: string, intro: string, text: string})=> {

    return (
        <div className={styles.infoWithIcon}>
            {/* <img className={styles.icon} height='20' width='20' src={`${srcIcon}.svg`} alt={srcIcon} /> */}
            <p className={styles.infoIntro}>{intro}</p>
            <p className={styles.infoText}>{text}</p>
        </div>
    )
}