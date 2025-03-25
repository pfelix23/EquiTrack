import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormModal from '..//LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useModal } from '../../context/Modal';
import { TfiLinkedin } from "react-icons/tfi";
import { IoLogoGithub } from "react-icons/io5";
import { BsFilePdf } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import * as sessionActions from '../../store/session'
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const { closeModal, setModalContent } = useModal();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => document.removeEventListener('click', handleClickOutside);
    
  }, []);

  const sessionLinks = sessionUser ? (
    <nav id='Modals'>
      <div id="a-tags">
      <a href="https://www.linkedin.com/in/peter-felix-3b038a174/" target="_blank" rel="noreferrer"><TfiLinkedin style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://github.com/pfelix23" target="_blank" rel="noreferrer"><IoLogoGithub style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://drive.google.com/file/d/1OLTFqFvMaPilhkwRfngTK2JQwtsIK32o/view?usp=sharing" target="_blank" rel="noreferrer"><BsFilePdf  style={{height:'19px', width:'19px'}}/>
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
      <a href="https://www.linkedin.com/in/peter-felix-3b038a174/" target="_blank" rel="noreferrer"><TfiLinkedin style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://github.com/pfelix23" target="_blank" rel="noreferrer"><IoLogoGithub style={{height:'19px', width:'19px'}} />
      </a>
      <a href="https://drive.google.com/file/d/1OLTFqFvMaPilhkwRfngTK2JQwtsIK32o/view?usp=sharing" target="_blank" rel="noreferrer"><BsFilePdf  style={{height:'19px', width:'19px'}}/>
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
          <div id='centered' onClick={() => navigate('/assets')}>Assets</div>
          <div id='centered' onClick={() => navigate('/liabilities')}>Liabilities</div>
          <div id='centered' onClick={() => navigate('/investments')}>Investments</div>
          </>)}
          <div id='centered' className='home' onClick={() => navigate('/')}>Home</div>
          <div id='hidden' onClick={() => alert("Feature Coming Soon")}>Company</div>
          <div id='hidden' onClick={() => alert("Feature Coming Soon")}>Mission</div>
          <div className='nav-item' ref={dropdownRef}>
          <AiOutlineMenu className='lines' onClick={toggleDropdown}/>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {!sessionUser && (
                <div >
                  <div className='dropdown' onClick={() => navigate('/')}>
                    Home
                  </div>
                  <div className='dropdown' onClick={() => alert("Feature Coming Soon")}>
                    Company
                  </div>
                  <div className='dropdown' onClick={() => alert("Feature Coming Soon")}>
                    Mission
                  </div>
                  <a href='https://www.linkedin.com/in/peter-felix-3b038a174/' style={{textDecoration:'none', color:'black'}}>
                  <div className='dropdown'>
                    Contact
                  </div>
                  </a>
                </div>
              )}
              {sessionUser && (
                <div >
                <div className='dropdown' onClick={() => navigate('/')}>
                  Home
                </div>
                <div className='dropdown' onClick={() => navigate('/assets')}>Assets</div>
                <div className='dropdown' onClick={() => navigate('/liabilities')}>Liabilities</div>
                <div className='dropdown' onClick={() => navigate('/investments')}>Investments</div>
                <a href='https://www.linkedin.com/in/peter-felix-3b038a174/' style={{textDecoration:'none', color:'black'}}>
                <div className='dropdown'>
                  Contact
                </div>
                </a>
              </div>
              )}
            </div>
          )} 
        </div>
          <a id='hidden' href='https://www.linkedin.com/in/peter-felix-3b038a174/' className='contact'>Contact</a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;