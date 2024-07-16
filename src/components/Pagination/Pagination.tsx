import styles from './pagination.module.scss'
import { Fragment } from "react"


interface IPagination {
    paginations: number[],
    callBackOnBtnClick: Function
}

export const Pagination = ({paginations, callBackOnBtnClick}: IPagination)=> {

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
        <p className={styles.pagination}>jump to #
            {
                paginations.map((num, i) => {
                    return (
                        <Fragment key={`fr-${num}`}>
                            {i > 0 ? <span key={`span-${num}`} > ... </span> : <></>}
                            <ButtonPagination key={`btn-${num}`} number={num}/>
                        </Fragment>
                    )
                })
            }
        </p>
    )
}