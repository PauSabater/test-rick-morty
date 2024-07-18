import styles from './pagination.module.scss'
import { Fragment } from "react"


interface IPagination {
    paginations: number[],
    callBackOnBtnClick: Function
}

/**
 * Componente para paginación
 *
 * @param {number[]}    props.paginations        - Números de la paginación
 * @param {Function}    props.callBackOnBtnClick - Función para manejar el click en los botones
 *
 * @returns {JSX.Element}
 */
export const Pagination = ({paginations, callBackOnBtnClick}: IPagination): JSX.Element=> {

    const ButtonPagination = ({number}:{number: number}) => {
        return (
            <button
                className={styles.btn}
                onClick={() => callBackOnBtnClick(number)}
            >
                {number}
            </button>
        )
    }

    return (
        <div className={styles.container}>
            <p>to #</p>
            {
                paginations.map((num, i) => {
                    return (
                        <Fragment key={`fr-${num}`}>
                            {i > 0 ? <span key={`span-${num}`} > - </span> : <></>}
                            <ButtonPagination key={`btn-${num}`} number={num}/>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}