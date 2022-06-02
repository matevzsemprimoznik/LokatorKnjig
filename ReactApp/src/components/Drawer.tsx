import React, {FC, useRef} from 'react';
import {MenuContext, MenuContextType} from '../context/menuContext';
import '../styles/Drawer.css';

type DrawerProps = {
    isOpen?: boolean,
    onClose?: (value: boolean | ((prevVal: boolean) => boolean)) => void,
    bodyElements: Array<any>
    onClickBodyElement: (element: any) => void
    defaultFloor: number
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose, bodyElements,onClickBodyElement, defaultFloor}) => {

    const { menuOpen, toggleMenuOpen } = React.useContext(MenuContext) as MenuContextType;
    const prevClickedElement = useRef<{key: number} | null>({key: defaultFloor})

    const onClick = (element: any) => {
        if(prevClickedElement.current && element.key !== prevClickedElement.current.key)
            onClickBodyElement(element)
        prevClickedElement.current = element
    }
    console.log(prevClickedElement)
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
                        <h2>Knjižnica hoče</h2>
                    </div>
                    <button type="button" onClick={toggleMenuOpen} className='drawer-button' >
                        <img src="../../close-icon-white.png"
                             alt="menu" aria-hidden="true"
                             onClick={toggleMenuOpen}/>

                    </button>
                </div>
                <div className='drawer-info-body'>
                    {bodyElements.map((element, index) => <div onClick={() => onClick(element)} key={index} className={ prevClickedElement.current?.key === element.key ? 'drawer-body-element-active' : 'drawer-body-element'}>{element.text}</div>)}
                </div>

            </div>
        </div>
    );
};


export default Drawer;

