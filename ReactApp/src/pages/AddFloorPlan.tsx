import {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {AuthContext} from '../context/authContext';
import LibrarySelectionPage from "./LibrarySelectionPage";
import {Loading} from "../components/Loading";
import Header from "../components/landing_page/Header";

const AddFloorPlan = () => {
    const location = useLocation();
    const {isAuth} = useContext(AuthContext);

    console.log(isAuth)

    if (isAuth == null) return <><Header/><Loading/></>
    if (!isAuth) return <Navigate to='/login' replace state={{from: location}}/>;
    return <><Header/><LibrarySelectionPage/></>;
};

export default AddFloorPlan;
