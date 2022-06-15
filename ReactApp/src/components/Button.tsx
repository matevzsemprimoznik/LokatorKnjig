import React, {CSSProperties, FC} from 'react';
import '../styles/Button.css';

type ButtonProps = {
    image?: string,
    onClick: () => void,
    alt?: string,
    text?: string,
    position?: { top?: number; left?: number; bottom?: number; right?: number }
    style?: CSSProperties
}

const Button: FC<ButtonProps> = ({image, position, onClick, alt, text, style}) => {

    const stylePosition: Record<string, string> = {
        top: `${position?.top}em` ?? "",
        left: `${position?.left}em` ?? "",
        right: `${position?.right}em` ?? "",
        bottom: `${position?.bottom}em` ?? "",
    }

    return (
        <button className="custom-button" style={{...stylePosition, ...style}} onClick={onClick}>
            {image ? (
                <img src={image}
                     alt={alt} aria-hidden="true"/>
            ) : (<p style={{margin: 0, padding: 0}}>{text}</p>
            )}
        </button>
    );
};

export default Button;












