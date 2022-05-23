import React, {useContext, useState} from "react";


export type MenuContextType = {
    menuOpen: boolean;
    setMenuOpen: (value: boolean | ((prevVal: boolean) => boolean)) => void;
};

export const MenuContext = React.createContext<MenuContextType | null>(null);

const MenuProvider = ({children}: any) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [library, setLibrary] = useState();


    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen);
        
    };
    return <MenuContext.Provider value={{menuOpen, setMenuOpen}}>{children}</MenuContext.Provider>;
};

export default MenuProvider;


    