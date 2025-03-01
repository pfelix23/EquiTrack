import './LandingPage.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useModal } from '../../context/Modal';

function LandingPage() {
    const [isVisible, setIsVisible] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const {closeModal, setModalContent} = useModal();

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(prevState => !prevState)
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSignup = () => {
        setModalContent( <SignupFormModal  closeModal={closeModal}/>)
    }

    return (
        <div>
            <div className='container'>
                <div className='landing-container'>
                <img id='landing-logo' src="Peter-Logo.png" alt="Logo"/>
                <h2 id='h2-landing'>Track the Dollars, Predict the Cents.</h2>
                <p id='p-tag'>At EquiTrack, our mission is to empower individuals and businesses to make informed financial decisions by providing a comprehensive platform to track investments, assets, and liabilities. We strive to simplify complex financial data and offer personalized investment suggestions, helping our users achieve greater financial health and security. With real-time insights, intuitive tools, and expert guidance, EquiTrack aims to be the trusted partner in your financial journey, helping you stay on track toward your financial goals.</p>
                {!sessionUser && (<button id='button-landing' onClick={handleSignup}>Signup to EquiTrack</button>)}
                </div>
            <div className='image-container'>
                <img
                className={`image first-image ${isVisible ? 'visible' : 'hidden'}`}
                src="Laptop.png" 
                alt="Laptop" 
                />
                <img 
                className={`image second-image ${!isVisible ? 'visible' : 'hidden'}`} 
                src="RisingAssets.png" 
                alt="Rising-Asset" 
                />
            </div>
            </div>
        </div>
    )
}

export default LandingPage;