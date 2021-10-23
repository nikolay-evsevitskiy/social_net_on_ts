import React from "react";
import preloader from "../../../assets/images/Rolling-1s-200px.svg";

type PreloaderType = {
    isFetching: boolean
}

export const Preloader = (props: PreloaderType) => {
    return <>
        {props.isFetching ? <img src={preloader}/> : null}
    </>
}