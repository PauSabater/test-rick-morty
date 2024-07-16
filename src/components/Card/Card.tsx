import Link from 'next/link'
import styles from './card.module.scss'
import { useEffect, useRef, useState } from 'react'
import { getSlugFromName } from '@/utils/utils'

export interface ICardCharacter {
    id?: string,
    image?: string,
    name?: string,
    imageLazy?: boolean,
    showSkeleton?: boolean
}


/**
 * Renderiza un Card con la información de un personaje
 *
 * @param {string}         props.id            - id del personaje
 * @param {string}         props.image      - src para la imagen
 * @param {string}         props.name          - nombre para el personaje
 * @param {boolean}        props.imageLazy     - si la imagen es lazyload
 * @param {boolean}        props.showSkeleton  - si se muestra el skeleton mientras carga la imagen
 */
export function CardCharacter({
    id,
    image,
    name,
    imageLazy,
    showSkeleton
 }: ICardCharacter) {

    const [displayLoader, setDisplayLoader] = useState<boolean>(true)

    useEffect(() => {
        // const img = new Image()
        // img.src = image

        // // If the image is cached, the onload event is triggered immediately
        // img.onload = () => setDisplayLoader(false)

        // // Cleanup in case the component is unmounted before the image loads
        // return () => {
        //   img.onload = null;
        // }
      }, [])


    return (
        <li>
            <Link
                href={getSlugFromName(name || '#')}
                className={styles.containerCard}
                data-is-loader={showSkeleton === true}
            >
                <div className={styles.containerImage}>
                    {
                        image && !showSkeleton ?
                            <img
                                src={image}
                                alt={name}
                                className={styles.image}
                                width={335}
                                height={335}
                                loading={imageLazy ? 'lazy' : 'eager'}
                                // onLoad={() => setDisplayLoader(false)}
                            />
                        :
                            <>
                                <svg className={styles.image} viewBox="0 0 710 710" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="710" height="710" fill="#D9D9D9"/>
                                </svg>
                                <div className={styles.loader}></div>
                            </>

                    }

                </div>
                <div className={styles.containerText}>
                    <p className={styles.name}>{name || 'dummy'}</p>
                    <p className={styles.id}>{id ? `#${id}` : ''}</p>
                </div>
            </Link>
        </li>
    )
}