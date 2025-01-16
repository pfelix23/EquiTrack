import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import './NewLiabilityModal.css';


function NewLiabilityModal({}) {
    const [errors, setErrors] = useState();
    const [liability_name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const { closeModal } = useModal();

    const handleCreate = (e) => {
        e.preventDefault();
        csrfFetch(`/api/liabilities/create`, {
            method: 'POST',
            body: JSON.stringify({
                liability_name,
                type,
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

    
    return (
        <div className='create-liability-container'>
            <h1 className='create-liability-text'>New Liability</h1>
            <form onSubmit={handleCreate} className='create-liability-form'>
                <label className='create-liability-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={liability_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='create-liability-label'>     
                Type:&nbsp;
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                </label>
                <label className='create-liability-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <button type="submit" className='create-liability-button'>Create Liability</button>
            </form>
        </div>
    )
}

export default NewLiabilityModal;