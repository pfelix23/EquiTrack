import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as assetsActions from '../../store/asset'
import './NewAssetModal.css';


function NewAssetModal() {
    const [errors, setErrors] = useState();
    const [asset_name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleCreate = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(assetsActions.create({
            asset_name,
            type,
            amount,
        }),
        )
       .then(closeModal())
       .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            console.log(errors);
          }
        });
      };

    
    return (
        <div className='new-asset-container'>
            <h1 className='new-asset-text'>New Asset</h1>
            <form onSubmit={handleCreate} className='new-asset-form'>
                <label className='new-asset-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={asset_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='new-asset-label'>
                Type:&nbsp;
                <input name="type" 
                id="asset-type" 
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                </input>
                </label>
                <label className='new-asset-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <button type="submit" className='create-asset-button'>Create Asset</button>
            </form>
        </div>
    )
}

export default NewAssetModal;