import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import './EditAssetModal.css';


function EditAssetModal({asset}) {
    const [errors, setErrors] = useState();
    const [asset_name, setName] = useState();
    const [type, setType] = useState();
    const [liquidType, setLiquidType] = useState();
    const [amount, setAmount] = useState();
    const { closeModal } = useModal();

    const handleEdit = (e) => {
        e.preventDefault();
        csrfFetch(`/api/assets/${asset.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                asset_name,
                type: type || liquidType,
                amount, 
            }) 
        })
        .then(res => res.json())
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
        
      };

    useEffect(() => {
        if(asset)
        setName(asset.asset_name);
        setType(asset.type);
        setAmount(asset.amount);
    }, [asset])



    
    return (
        <div className='edit-asset-container'>
            <h1 className='edit-asset-text'>Edit Asset</h1>
            <form onSubmit={handleEdit} className='edit-asset-form'>
                <label className='edit-asset-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={asset_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='edit-asset-label'>     
                Type:&nbsp;
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    disabled={!!liquidType}
                />
                </label>
                <label className='edit-asset-label'>
                Liquid-Type:&nbsp;
                <select name="type" 
                id="asset-type" 
                value={liquidType}
                onChange={(e) => {setLiquidType(e.target.value)}}
                >
                    <option value="">Select Liquid Type</option>
                    <option value="Cash">Cash</option>
                    <option value="Real-Estate">Real-Estate</option>
                    <option value="Savings">Savings</option>
                    <option value="401K">401K</option>
                </select>
                </label>
                <label className='edit-asset-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <button type="submit" className='edit-asset-button'>Update Asset</button>
            </form>
        </div>
    )
}

export default EditAssetModal;