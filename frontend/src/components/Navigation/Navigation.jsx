import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginFormModal from '..//LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useModal } from '../../context/Modal';
import { TfiLinkedin } from "react-icons/tfi";
import { IoLogoGithub } from "react-icons/io5";
import { BsFilePdf } from "react-icons/bs";
import * as sessionActions from '../../store/session'
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { closeModal, setModalContent } = useModal();
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    setModalContent(<LoginFormModal closeModal={closeModal} /> )
  }

  const handleSignup = () => {
    setModalContent(<SignupFormModal closeModal={closeModal} /> )
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

  const className = () => {
    if(sessionUser) {
      return 'nav-2'
    } else return 'nav-3'
  }


  const sessionLinks = sessionUser ? (
    <nav id='Modals'>
      <div id="a-tags">
      <a href="https://www.linkedin.com/in/peter-felix-3b038a174/"><TfiLinkedin style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://github.com/pfelix23"><IoLogoGithub style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://drive.google.com/file/d/1tYruP88tYD3urpg4p0zSVEkiVO1S_K_1/view?usp=drive_link"><BsFilePdf  style={{height:'19px', width:'19px'}}/>
      </a>
      </div>
      <div id="button">
      <button id="logout-button" onClick={logout}>Logout</button>
      <button id='profile-button' onClick={() => navigate('/user')}>Profile</button>
      </div>
    </nav>
  ) : (
    <div id='Modals'>
      <div id="a-tags">
      <a href="https://www.linkedin.com/in/peter-felix-3b038a174/"><TfiLinkedin style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://github.com/pfelix23"><IoLogoGithub style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://drive.google.com/file/d/1tYruP88tYD3urpg4p0zSVEkiVO1S_K_1/view?usp=drive_link"><BsFilePdf  style={{height:'19px', width:'19px'}}/>
      </a>
      </div>
      <div id="buttons">
      <button id="login-button" onClick={() => handleLogin()}>EquiTrack Login</button>
      <button id="signup-button" onClick={() => handleSignup()}>EquiTrack Signup</button>
      </div>
    </div>
  );

  return (
    <div>
      {isLoaded && sessionLinks}
      <div className='additional_nav'>
        <img onClick={() => navigate('/')} className='logo' src="logo-final.png" alt="EquiTrack" />
        <div className={className()}>
          {sessionUser && (
          <>
          <div onClick={() => navigate('/assets')}>Assets</div>
          <div onClick={() => navigate('/liabilities')}>Liabilities</div>
          <div onClick={() => navigate('/investments')}>Investments</div>
          </>)}
          <div onClick={() => navigate('/')}>Home</div>
          <div onClick={() => alert("Feature Coming Soon")}>Company</div>
          <div onClick={() => alert("Feature Coming Soon")}>Mission</div>
          <a href='https://www.linkedin.com/in/peter-felix-3b038a174/' className='contact'>Contact</a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;