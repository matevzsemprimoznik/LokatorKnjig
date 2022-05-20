import React, {FC} from 'react';
import '../styles/Button.css';

type ButtonProps = {
    image?: string,
    visible?: boolean,
    action?: Function,
    stateValue?: object,
    alt?: string,
    position?: { top?: number; left?: number; bottom?: number; right?: number }
}

const Button: FC<ButtonProps> = ({image, position, visible, action, stateValue, alt}) => {

    const style: Record<string, string> = {
        top: `${position?.top}em` ?? "",
        left: `${position?.left}em` ?? "",
        right: `${position?.right}em` ?? "",
        bottom: `${position?.bottom}em` ?? "",
    }

    return (
        <button className="custom-button" style={style}>
            <img src={image}
                 alt={alt} aria-hidden="true"
                 onClick={() => action}/>
        </button>
    );
};

export default Button;












