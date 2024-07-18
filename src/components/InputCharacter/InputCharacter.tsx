import { getSlugFromName } from "@/utils/utils"
import styles from './inputCharacter.module.scss'

/** Componente para mostrar un input con la imagen y nombre de un personaje
 *
 * @param {string} param.id           - ID del personaje
 * @param {string} param.image        - URL de la imagen
 * @param {string} param.name         - Nombre del personaje
 * @param {boolean} param.checked     - Estado del input
 * @param {Function} param.onChange   - Función para manejar el cambio del input
 * @param {boolean} [param.isInModal] - Indica si el input está en los resultados
 *
 * @returns {JSX.Element}
 */
export const InputCharacter = ({id, image, name, checked, onChange, isInModal}: {
        id: string | undefined,
        image: string | undefined,
        name: string | undefined,
        checked: boolean | undefined,
        onChange: Function,
        isInModal?: boolean
    })=> {

    if (!id || !image || !name) return <></>

    const idInput = getSlugFromName(name)
    return (
        <>
        <input
            type='checkbox'
            id={idInput}
            checked={checked}
            className={`${styles.input}`}
            onChange={() => onChange(name)}
        ></input>
        <label htmlFor={idInput} className={`${styles.label} ${isInModal ? styles.labelModal : ''}`}>
            <img
                src={image}
                alt={name}
                className={styles.image}
                loading={'lazy'}
            />
            <p>{`#${id}`}</p>
            <p>{name}</p>
        </label>
        </>
    )
}