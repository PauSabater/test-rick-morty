import styles from './cardCharacterDetailed.module.scss'

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
    firstEpisode: IDataEpisode
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
                    width={470}
                    height={570}
                ></img>
                <div className={styles.infoContainer}>
                    <p className={styles.name}>{name}</p>
                    <InfoWithIcon
                        intro='Origin'
                        text={planet}
                    />
                    <InfoWithIcon
                        intro='Gender'
                        text={gender}
                    />
                    <InfoWithIcon
                        intro='Species'
                        text={species}
                    />
                    <InfoWithIcon
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
    {intro, text}:
    {intro: string, text: string})=> {

    return (
        <div className={styles.infoWithIcon}>
            <p className={styles.infoIntro}>{intro}</p>
            <p className={styles.infoText}>{text}</p>
        </div>
    )
}