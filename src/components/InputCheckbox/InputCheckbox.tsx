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
        onChangeCallback(id, true)
    }

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (isChecked) {
            setIsChecked(false)
            onChangeCallback(id, false)
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
                onChange={(e) => handleCheckboxChange(e)}
                onClick={(e) => handleInputClick(e)}
            />
            <label className={styles.label} htmlFor={id}>{value}</label>
        </div>
    )
}