import { useState } from 'react';
import * as usersActions from '../../store/users';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteUserModal.css'


function DeleteUserModal({userId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  
   
  const handleDelete = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(usersActions.deleteUser(userId),
    )
   .then(closeModal)
   .then(dispatch(sessionActions.logout()))
   .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.log(errors);
      }
    });
  };
  
  
  return (
    <div className='delete-account-container'>
      <h1 className='delete-account-text'>Confirm Delete</h1>
      <h3 className='confirm-account-text'>Are you sure you want to delete your Account?</h3>
      <form onSubmit={handleDelete} className='delete-account-form'>
        <div className='delete-account-button-container'>
        <button style={{border: 'none'}}
        className='delete-account-button'
        type='submit'
        > Yes (Delete Account)</button>
        </div>
        
        <div className='delete-account-button-div'>
        <button style={{border: 'none'}}
        className='keep-account-button'
        type='button'
        onClick={() => closeModal()}
        > No (Keep Account) </button>
        </div> 
      </form>
    </div>
  );
}

export default DeleteUserModal;