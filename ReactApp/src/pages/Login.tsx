import { FC, SetStateAction, useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { auth } from '../firebase-config';
import { Location } from 'history';

interface LoginProps {
  previousLocation: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login: FC<LoginProps> = ({ previousLocation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);

  const navigatePathname = useMemo(() => {
    const state = location.state as { from: { pathname: string } };

    if (state && state.from) {
      return state.from.pathname;
    }

    return '/';
  }, [location]);

  const onClick = async () => {
    try {
      if (loginUser) await loginUser(username, password);

      navigate(navigatePathname);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type='email' name='email' onChange={(e) => setUsername(e.target.value)} />
      <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={onClick}>Prijava</button>
    </div>
  );
};

export default Login;
