import React, {FC, useRef} from 'react';
import {MenuContext, MenuContextType} from '../context/menuContext';
import '../styles/Drawer.css';
import CloseIcon from '../assets/close-icon-white.png';

type DrawerProps = {
    isOpen?: boolean,
    onClose?: (value: boolean | ((prevVal: boolean) => boolean)) => void,
    section: string
    bodyElements: Array<any>
    onClickBodyElement: (element: any) => void
    defaultFloor?: number
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose, section, bodyElements, onClickBodyElement, defaultFloor}) => {

    const {menuOpen, toggleMenuOpen} = React.useContext(MenuContext) as MenuContextType;
    const prevClickedElement = useRef<{ key: number | undefined } | null>({key: defaultFloor})

    const onClick = (element: any) => {
        onClickBodyElement(element)
        prevClickedElement.current = element
        toggleMenuOpen()
    }
    return (
        <div
            className={menuOpen ? "drawer drawer-open" : "drawer drawer-close"}
        >
            <div
                className="open"
                role="dialog"
            >

                <div className="drawer-info-header">
                    <div>
                        <h2>{section}</h2>
                    </div>
                    <button type="button" onClick={toggleMenuOpen} className='drawer-button'>
                        <img src={CloseIcon}
                             alt="menu" aria-hidden="true"
                             onClick={toggleMenuOpen}/>
                    </button>
                </div>
                <div className='drawer-info-body'>
                    {bodyElements.map((element, index) => <div onClick={() => onClick(element)} key={index}
                                                               className={prevClickedElement.current?.key === element.key ? 'drawer-body-element-active' : 'drawer-body-element'}>{element.text}</div>)}
                </div>

            </div>
        </div>
    );
};


export default Drawer;

