import React, {FC} from 'react';
import '../styles/Button.css';

type ButtonProps = {
    image?: string,
    onClick: () => void,
    alt?: string,
    text?: string,
    position?: { top?: number; left?: number; bottom?: number; right?: number }
}

const Button: FC<ButtonProps> = ({image, position, onClick, alt, text}) => {

    const style: Record<string, string> = {
        top: `${position?.top}em` ?? "",
        left: `${position?.left}em` ?? "",
        right: `${position?.right}em` ?? "",
        bottom: `${position?.bottom}em` ?? "",
    }

    return (
        <button className="custom-button" style={style} onClick={onClick}>
            {image ? (
            <img src={image}
                 alt={alt} aria-hidden="true"/>
            ) : ( <p style={{margin: 0, padding: 0}}>{text}</p>
            )}
        </button>
    );
};

export default Button;












