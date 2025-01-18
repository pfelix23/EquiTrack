import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = {
    credential: 'demo@user.com',
    password: 'password'
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    setCredential(demoUser.credential);
    setPassword(demoUser.password);
    return dispatch(sessionActions.login(demoUser))
      .then(() => {
        closeModal()
        window.location.href = '/'
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log(errors)
        }
      });
  };


  return (
    <>
      <h1 className='login-text'>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label className='login-label'>
          Username or Email:
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='login-label'>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" className='login-button'>Log In</button>
        <h3 
        className='demo-user'
        type="button"
        onClick={handleDemoUser}
        >Demo User</h3>
      </form>
    </>
  );
}

export default LoginFormModal;