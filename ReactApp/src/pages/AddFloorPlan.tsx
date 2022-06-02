import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LibrarySelectionPage from "./LibrarySelectionPage";

const AddFloorPlan = () => {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);

  if(isAuth == null) return <div>Loading</div>
  if (!isAuth) return <Navigate to='/login' replace state={{ from: location }} />;
  return <LibrarySelectionPage />;
};

export default AddFloorPlan;
