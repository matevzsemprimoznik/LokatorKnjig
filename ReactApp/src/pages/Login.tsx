import React, {FC, FormEvent, FormEventHandler, useContext, useMemo, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/login/login.css'
import Footer from "../components/landing_page/Footer";


const Login: FC = () => {
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

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (loginUser) await loginUser(username, password);
      navigate(navigatePathname);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
      <>
      <div className='login'>
        <form onSubmit={onLogin} >
          <div className='input-container'>
            <label htmlFor='email'>Elektronski naslov</label>
            <input type='email' name='email' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='input-container'>
            <label htmlFor='password'>Geslo</label>
            <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>Prijava</button>
        </form>
      </div>
        <Footer />
      </>

  );
};

export default Login;
