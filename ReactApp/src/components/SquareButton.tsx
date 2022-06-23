import React, {CSSProperties, FC, MouseEventHandler} from "react";

interface SquareButtonProps {
    disabled?: boolean,
    text: string,
    onClick: () => void
    style?: CSSProperties
}

const SquareButton: FC<SquareButtonProps> = ({disabled = false, text, onClick, style}) => {
    return <button className='library-button' disabled={disabled} onClick={onClick} style={style}>
        {text}
    </button>
}

export default SquareButton