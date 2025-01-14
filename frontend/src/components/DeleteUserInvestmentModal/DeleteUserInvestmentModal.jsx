import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as usersActions from '../../store/users';
import * as sessionActions from '../../store/session';
import * as investmentActions from '../../store/investments';
import './DeleteUserInvestmentModal.css'


function DeleteUserInvestmentModal({userId, investmentId}) {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  
   
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

  const handleInvestment = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(investmentActions.deleteInvestment(investmentId),
    )
   .then(closeModal)
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
      <h3 className='confirm-account-text'>{investmentId ? 'Are you sure you want to delete your Investment?' : 'Are you sure you want to delete your Account?'}</h3>
      <form onSubmit={investmentId ? handleInvestment : handleDelete} className='delete-account-form'>
        <div className='delete-account-button-container'>
        <button style={{border: 'none'}}
        className='delete-account-button'
        type='submit'
        > {investmentId ? 'Yes (Delete Investment)' : 'Yes (Delete Account)'}</button>
        </div>
        
        <div className='delete-account-button-div'>
        <button style={{border: 'none'}}
        className='keep-account-button'
        type='button'
        onClick={() => closeModal()}
        > {investmentId ? 'No (Keep Investment)' : 'No (Keep Account)'} </button>
        </div> 
      </form>
    </div>
  );
}

export default DeleteUserInvestmentModal;