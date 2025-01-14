import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as investmentActions from '../../store/investments'
import './NewInvestmentModal.css';


function NewInvestmentModal() {
    const [errors, setErrors] = useState();
    const [investment_name, setName] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    const [length, setLength] = useState();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleCreate = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(investmentActions.create({
            investment_name,
            type,
            amount,
            length
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
        <div className='new-investment-container'>
            <h1 className='new-investment-text'>New Investment</h1>
            <form onSubmit={handleCreate} className='new-investment-form'>
                <label className='new-investment-label'>     
                Name:&nbsp;
                <input
                    type="text"
                    value={investment_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label className='new-investment-label'>
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
                <label className='new-investment-label'>
                Amount:&nbsp;
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </label>
                <label className='new-investment-label'> 
                Months:&nbsp;
                <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    required
                /> 
                </label>
                <button type="submit" className='create-investment-button'>Create</button>
            </form>
        </div>
    )
}

export default NewInvestmentModal;