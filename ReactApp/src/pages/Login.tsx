import React, {FC, FormEvent, FormEventHandler, useContext, useEffect, useMemo, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/login/login.css'
import Footer from "../components/landing_page/Footer";
import Error from '../components/Error'
import Header from "../components/landing_page/Header";

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null)
  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    setError(null)
  }, [username, password])

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
      setError(error)
    }
  };
  return (
      <>
        <Header/>
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
          {error && <Error message={error}/>}
        </form>
      </div>
        <Footer />
      </>

  );
};

export default Login;
