import React, {FC} from 'react';
import {MenuContext, MenuContextType} from '../context/menuContext';
import '../styles/Drawer.css';

type DrawerProps = {
    isOpen?: boolean,
    onClose?: (value: boolean | ((prevVal: boolean) => boolean)) => void,
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose}) => {

    const { menuOpen, toggleMenuOpen } = React.useContext(MenuContext) as MenuContextType;

    console.log(menuOpen)

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
                        <img src="../close-icon-white.png"
                             alt="menu" aria-hidden="true"
                             onClick={toggleMenuOpen}/>

                    </button>
                </div>
                <div className='drawer-info-body'>
                    <div className='drawer-body-element'>1 Nadstropje</div>
                </div>

            </div>
        </div>
    );
};


export default Drawer;

