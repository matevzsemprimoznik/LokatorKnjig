import React, {FC} from 'react';
import {MenuContext, MenuContextType} from '../context/menuContext';
import '../styles/Drawer.css';

type DrawerProps = {
    isOpen?: boolean,
    onClose?: (value: boolean | ((prevVal: boolean) => boolean)) => void,
}

const Drawer: FC<DrawerProps> = ({isOpen, onClose}) => {

    const { menuOpen, setMenuOpen } = React.useContext(MenuContext) as MenuContextType;



    return (
        <div
            className={menuOpen ? "drawer-container drawer" : "backdrop"}
        >
            <div
                className="open"
                role="dialog"
            >
                <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="drawer-button" >
                    <img src="../close-icon.png"
                         alt="menu" aria-hidden="true"
                         onClick={() => setMenuOpen(!menuOpen)}/>

                </button>
                <div className="drawer-info-header">
                    <h2>Seznam knjižnic</h2>
                    <hr className="drawer-info-divider"/>
                </div>

            </div>
            <div className="backdrop" />
        </div>
    );
};


export default Drawer;

