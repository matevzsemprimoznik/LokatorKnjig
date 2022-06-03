import LoadingIcon from '../assets/loading.gif'
import '../styles/Loading.css'
import {memo} from "react";

const Loadingg = () => {
    return <img className='loading' src={LoadingIcon} alt="loading..." />
}
export const Loading = memo(Loadingg)