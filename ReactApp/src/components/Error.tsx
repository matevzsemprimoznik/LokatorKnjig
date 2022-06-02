import {FC} from "react";
import '../styles/Error.css'
interface ErrorProps{
    message: string
}
const Error:FC<ErrorProps> = ({message}) => {
    return <div className='error'>{message}</div>
}
export default Error