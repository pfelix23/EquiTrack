import './UserProfilePage.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';

function UserProfilePage () {
    const [errors, setErrors] = useState();
    const [investments, setInvestments] = useState();
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const { closeModal, setModalContent } = useModal();
    const user = useSelector(state => state.session.user);
    
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
    },[errors, closeModal]);

    useEffect(() => {
        csrfFetch('/api/assets')
        .then(res => res.json())
        .then((data) => setAssets(data.Assets))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal]);

    useEffect(() => {
        csrfFetch('/api/liabilities')
        .then(res => res.json())
        .then((data) => setLiabilities(data.Liabilities))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal]);

    const investmentsTotal = investments?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

    const netLabelValue = () => {
        if(!assets || assets?.length === 0) return `No Assets Available`
        else if(assets[0]?.net_deficiency) return `Net Deficiency: ${assets[0]?.net_deficiency}`
        else return `Net Assets: ${assets[0]?.net_assets}`
    }

    return (
        <div id='userForm-Container'>
            <form action="" >
                <label htmlFor="">
                    First Name:
                    <input type="text" 
                    value={user?.firstName}
                    /> <button>Edit</button>
                </label>
                <label htmlFor="">
                    Last Name:
                    <input type="text"
                    value={user?.lastName}
                    />
                </label>
                <label htmlFor="">
                    Username:
                    <input type="text"
                    value={user?.username}
                    />
                </label>
                <label htmlFor="">
                    Email:
                    <input type="text"
                    value={user?.email}
                    />
                </label>
                <label htmlFor="">Total Investments: {investments?.length}</label>
                <label htmlFor="">Net Investments: ${investmentsTotal}</label>
                <label htmlFor="">Total Assets: {assets?.length}</label>
                <label htmlFor="">Assets Amount: ${assetsTotal}</label>
                <label htmlFor="">Total Liabilities: {liabilities?.length}</label>
                <label htmlFor="">Liabilities Amount: ${liabilitiesTotal}</label>
                <label htmlFor="">{netLabelValue()}</label>
            </form>

        </div>
    )
}

export default UserProfilePage;