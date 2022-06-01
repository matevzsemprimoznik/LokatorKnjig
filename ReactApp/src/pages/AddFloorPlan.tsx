import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const AddFloorPlan = () => {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);

  if(isAuth == null) return <div>Loading</div>
  if (!isAuth) return <Navigate to='/login' replace state={{ from: location }} />;
  return <div>Protected</div>;
};

export default AddFloorPlan;
