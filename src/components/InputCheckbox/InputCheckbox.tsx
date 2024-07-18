import styles from './inputCheckbox.module.scss'
import { ChangeEvent } from "react"

interface IInputCheckbox {
    name: string,
    value: string,
    id: string,
    onChangeCallback: Function
}

/**
 * Renderiza un input de tipo checkbox
 *
 * @param {string}         props.name           - Nombre del input
 * @param {string}         props.value          - Valor del input
 * @param {string}         props.id             - ID del input
 * @param {Function}       props.onChangeCallback - Función para manejar el cambio del input
 *
 * @returns {JSX.Element}
 */
export const InputCheckbox = ({name, value, id, onChangeCallback}: IInputCheckbox) => {


    /** Callback para manejar el cambio de los inputs
     *
     * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio
     * @returns {void}
     */
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked
        onChangeCallback(id, checked)
        const elsInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`input[name="${name}"]`)

        // Deseleccionar los demás inputs
        elsInputs.forEach((el: HTMLInputElement) => {
            if (el.id !== id) {
                el.checked = false
            }
        })
    }

    return (
        <div className={styles.inputContainer}>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                className={styles.input}
                onChange={(e) => handleCheckboxChange(e)}
            />
            <label className={styles.label} htmlFor={id}>{value}</label>
        </div>
    )
}