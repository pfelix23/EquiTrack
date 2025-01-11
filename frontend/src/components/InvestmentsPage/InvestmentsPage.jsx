import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { useModal } from "../../context/Modal";

function InvestmentPage() {
    const [investments, setInvestments] = useState();
    const [errors, setErrors] = useState();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        csrfFetch('/api/investments')
        .then(res => res.json())
        .then((data) => setInvestments(data.Investments))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors])
   console.log(investments)
    
    return (
        <div>
            <div>
                {investments?.map((investment) => {
                    return(<section  key={investment.id}> 
                        <h2>{investment.investment_name}</h2>
                        <p>{investment.type}</p>
                        <p>{investment.amount}</p>
                        <p>{investment.ROR}</p>
                        <p>{investment.length}</p>
                        <p>{investment.risk_percentage}</p>
                        <p>{investment.projection}</p>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

export default InvestmentPage