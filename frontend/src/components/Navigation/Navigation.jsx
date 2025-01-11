import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '..//LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useModal } from '../../context/Modal';
import { TfiLinkedin } from "react-icons/tfi";
import { IoLogoGithub } from "react-icons/io5";
import { BsFilePdf } from "react-icons/bs";
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { closeModal, setModalContent } = useModal();
  const handleLogin = () => {
    setModalContent(<LoginFormModal closeModal={closeModal} /> )
  }

  const handleSignup = () => {
    setModalContent(<SignupFormModal closeModal={closeModal} /> )
  }

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <div id='Modals'>
      <div id="a-tags">
      <a href="https://www.linkedin.com/in/peter-felix-3b038a174/"><TfiLinkedin style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://github.com/pfelix23"><IoLogoGithub style={{height:'19px', width:'19px'}} />
      </a>
      <a href=""><BsFilePdf  style={{height:'19px', width:'19px'}}/>
      </a>
      </div>
      <div id="buttons">
      <div id="login-button" onClick={() => handleLogin()}>EquiTrack Login</div>
      <div id="signup-button" onClick={() => handleSignup()}>EquiTrack Signup</div>
      </div>
    </div>
  );

  return (
    <div>
      {isLoaded && sessionLinks}
      <div className='addition_nav'>
        <img className='logo' src="/EquiTrack_Logo.jpg" alt="EquiTrack" />
        <div className='nav-2'>
          <div onClick={() => navigate('/')}>Home</div>
          <div>Company</div>
          <div>Mission</div>
          <div>Contact</div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;