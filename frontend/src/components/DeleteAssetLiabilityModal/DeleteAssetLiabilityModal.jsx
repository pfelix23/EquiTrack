import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as assetActions from '../../store/assets';
import * as liabilityActions from '../../store/liabilities';
import './DeleteAssetLiabilityModal.css'


function DeleteAssetLiabilityModal({assetId, liabilityId, navigate}) {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  
   
  const handleDeleteAsset = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(assetActions.deleteAsset(assetId),
    )
   .then(closeModal)
   .then(navigate('/assets'))
   .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.error(errors);
      }
    });
  };

  const handleDeleteLiability = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(liabilityActions.deleteLiability(liabilityId),
    )
   .then(closeModal)
   .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.error(errors);
      }
    });
  };
  
  
  return (
    <div className='delete-asset-container'>
      <h1 className='delete-asset-text'>Confirm Delete</h1>
      <h3 className='confirm-asset-text'>{liabilityId ? 'Are you sure you want to delete your Liability?' : 'Are you sure you want to delete your Asset?'}</h3>
      <form onSubmit={liabilityId ? handleDeleteLiability : handleDeleteAsset} className='delete-asset-form'>
        <div className='delete-asset-button-container'>
        <button style={{border: 'none'}}
        className='delete-asset-button'
        type='submit'
        > {liabilityId ? 'Yes (Delete Liability)' : 'Yes (Delete Asset)'}</button>
        </div>
        
        <div className='delete-asset-button-div'>
        <button style={{border: 'none'}}
        className='keep-asset-button'
        type='button'
        onClick={() => closeModal()}
        > {liabilityId ? 'No (Keep Liability)' : 'No (Keep Asset)'} </button>
        </div> 
      </form>
    </div>
  );
}

export default DeleteAssetLiabilityModal;