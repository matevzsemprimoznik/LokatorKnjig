import {FC, ReactNode, useLayoutEffect, useState} from "react";
import {Loading} from "../components/Loading";

interface CustomSuspense {
    isModelLoaded: boolean,
    children: ReactNode;
    conditionForSuccess?: boolean
}

const CustomSuspense: FC<CustomSuspense> = ({isModelLoaded, children, conditionForSuccess}) => {
    return <>
        {!isModelLoaded || !conditionForSuccess ? <Loading/> : null}
        <div style={{visibility: !isModelLoaded ? 'hidden' : 'visible', height: '90vh'}}>
            {children}
        </div>
    </>;
}

export default CustomSuspense