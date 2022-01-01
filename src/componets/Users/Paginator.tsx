import s from "./Users.module.css";
import React from "react";

type PaginatorPropsType = {
    usersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator: React.FC<PaginatorPropsType> = ({usersCount, pageSize, currentPage, onPageChanged}) => {
    let pageCount = Math.ceil(usersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span onClick={() => {
                onPageChanged(p)
            }} className={currentPage === p ? s.selectedPage : ''}>{p}</span>
        })}
    </div>
}