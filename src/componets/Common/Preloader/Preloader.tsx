import React from "react";
import preloader from "../../../assets/images/Rolling-1s-200px.svg";

type PreloaderType = {
    isFetching: boolean
}

export const Preloader: React.FC<PreloaderType> = ({isFetching}) => {
    return <>
        {isFetching ? <img src={preloader} alt={'loading...'}/> : null}
    </>
}