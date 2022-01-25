import s from "./Paginator.module.css";
import React, {useState} from "react";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}


export const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pageCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber =  (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        { portionNumber > 1 &&
            <button onClick={ () => {setPortionNumber(portionNumber - 1)}}>PREV</button>

        }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span onClick={() => {
                onPageChanged(p)
            }} className={currentPage === p ? s.selectedPage : ''}>{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>NEXT</button> }
    </div>
}