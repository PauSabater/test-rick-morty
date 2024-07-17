import styles from './inputCheckbox.module.scss'
import { ChangeEvent, useState } from "react"

interface IInputCheckbox {
    name: string,
    value: string,
    id: string,
    onChangeCallback: Function
}

export const InputCheckbox = ({name, value, id, onChangeCallback}: IInputCheckbox) => {

    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setIsChecked(checked)
        // onSelectionUpdate(id, e.target.checked)
        onChangeCallback(id, checked)
    }

    const handleInputClick = () => {
        if (isChecked) {
            setIsChecked(false)
            // onSelectionUpdate(id, false)
            onChangeCallback(id, false)
        } else {
            setIsChecked(true)
            // onSelectionUpdate(id, true)
            onChangeCallback(id, true)
        }
    }

    return (
        <div className={styles.inputContainer}>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                className={styles.input}
                checked={isChecked}
                // onChange={(e) => handleCheckboxChange(e)}
                onClick={handleInputClick}
            />
            <label className={styles.label} htmlFor={id}>{value}</label>
        </div>
    )
}