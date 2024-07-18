import styles from './buttonIcon.module.scss'

interface IButtonFilter {
    callbackOnClick: Function,
    icon: string,
    value: string,
    alt: string,
    background?: string
    text?: string
}

/** Componente para botones con iconos
 *
 * @param {Function} param.callbackOnClick - Función a ejecutar al hacer click
 * @param {string}   param.icon            - Icono a mostrar
 * @param {string}   param.value           - Valor del botón
 * @param {string}   param.alt             - Texto alternativo para la imagen
 * @param {string}   param.background      - Clase para el background
 * @param {string}   [param.text]          - Texto a mostrar, opcional
 *
 * @returns {JSX.Element}
 */
export const ButtonIcon = ({
        callbackOnClick,
        icon,
        value,
        alt,
        background,
        text
    }: IButtonFilter)=> {

    return (
        <button
            onClick={() => callbackOnClick()}
            className={`${styles.button} ${background ? styles[background] : ''}`}
            value={value}
        >
            <img
                src={icon}
                alt={alt}
                className={styles.image}
                height={'30'}
                width={'30'}
                data-inversed
            />
            { text ? <span>{text}</span> : null }
        </button>
    )
}