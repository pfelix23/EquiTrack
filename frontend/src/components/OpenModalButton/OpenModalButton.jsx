import { useModal } from '../../context/Modal';
import '../LoginFormModal/LoginForm.css'

function OpenModalButton({
  modalComponent, 
  buttonText, 
  onButtonClick, 
  onModalClose 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <div className='modal-container' onClick={onClick}>{buttonText}</div>;
}

export default OpenModalButton;