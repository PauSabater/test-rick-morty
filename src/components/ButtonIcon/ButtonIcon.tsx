import styles from './buttonIcon.module.scss'

interface IButtonFilter {
    callbackOnClick: Function,
    icon: string,
    value: string,
    alt: string,
    background?: string
}


export const ButtonIcon = ({callbackOnClick, icon, value, alt, background}: IButtonFilter)=> {

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
            />
        </button>
    )
}