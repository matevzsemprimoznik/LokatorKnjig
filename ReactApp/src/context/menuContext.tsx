import React, {useContext, useState} from "react";


export type MenuContextType = {
    menuOpen: boolean;
    toggleMenuOpen: () => void
};

export const MenuContext = React.createContext<MenuContextType>({
    menuOpen: false,
    toggleMenuOpen: () => {}
});

const MenuProvider = ({children}: any) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen);
        
    };
    return <MenuContext.Provider value={{menuOpen, toggleMenuOpen}}>{children}</MenuContext.Provider>;
};

export default MenuProvider;


    