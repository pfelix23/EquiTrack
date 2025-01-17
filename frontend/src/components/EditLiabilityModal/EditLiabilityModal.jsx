import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import './EditLiabilityModal.css';


function EditLiabilityModal({liability}) {
    const [errors, setErrors] = useState();
    const [liability_name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const { closeModal } = useModal();

    const handleEdit = (e) => {
        e.preventDefault();
        csrfFetch(`/api/liabilities/${liability.id}/edit`, {
            method: 'PUT',
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

    useEffect(() => {
        if(liability)
        setName(liability.liability_name);
        setType(liability.type);
        setAmount(liability.amount);
    }, [errors, liability])

    
    return (
        <div className='edit-liability-container'>
            <h1 className='edit-liability-text'>Edit Liability</h1>
            <form onSubmit={handleEdit} className='edit-liability-form'>
                <label className='edit-liability-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={liability_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='edit-liability-label'>     
                Type:&nbsp;
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                </label>
                <label className='edit-liability-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <button type="submit" className='edit-liability-button'>Update Liability</button>
            </form>
        </div>
    )
}

export default EditLiabilityModal;