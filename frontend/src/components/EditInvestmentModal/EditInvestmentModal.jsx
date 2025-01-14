import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import './EditInvestmentModal.css';


function EditInvestmentModal({investment}) {
    const [errors, setErrors] = useState();
    const [investment_name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const [length, setLength] = useState();
    const { closeModal } = useModal();

    const handleEdit = (e) => {
        e.preventDefault();
        csrfFetch(`/api/investments/${investment.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                investment_name,
                type,
                amount,
                length 
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
        if(investment)
        setName(investment.investment_name);
        setType(investment.type);
        setAmount(investment.amount);
        setLength(investment.length);
    }, [errors])

    
    return (
        <div className='edit-investment-container'>
            <h1 className='edit-investment-text'>Edit Investment</h1>
            <form onSubmit={handleEdit} className='edit-investment-form'>
                <label className='edit-investment-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={investment_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='edit-investment-label'>
                Type:&nbsp;
                <select name="type" 
                id="investment-type" 
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Select an option</option>
                    <option value="S&P 500">S&P 500</option>
                    <option value="US Small-Cap">US Small-Cap</option>
                    <option value="Real-Estate">Real-Estate</option>
                    <option value="Bond">Bond</option>
                </select>
                </label>
                <label className='edit-investment-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <label className='edit-investment-label'> 
                Months:&nbsp;
                <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    required
                /> 
                </label>
                <button type="submit" className='edit-investment-button'>Edit</button>
            </form>
        </div>
    )
}

export default EditInvestmentModal;