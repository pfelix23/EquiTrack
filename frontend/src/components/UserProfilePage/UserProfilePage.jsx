import './UserProfilePage.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { csrfFetch } from '../../store/csrf';
import * as usersActions from '../../store/users'
import { useNavigate } from 'react-router-dom';
import DeleteUserInvestmentModal from '../DeleteUserInvestmentModal/DeleteUserInvestmentModal';

function UserProfilePage () {
    const [errors, setErrors] = useState();
    const [investments, setInvestments] = useState();
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditing1, setIsEditing1] = useState(false);
    const [isEditing2, setIsEditing2] = useState(false);
    const [isEditing3, setIsEditing3] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const { closeModal, setModalContent } = useModal();
    const user = useSelector(state => state.session.user, (prevUser, nextUser) => prevUser?.id === nextUser?.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
    },[errors, user]);
    
    
    useEffect(() => {
        if(user) {
            setFirstName(user?.firstName)
            setLastName(user?.lastName)
            setEmail(user?.email)
            setUsername(user?.username)
        } else navigate('/')
    }, [navigate, user])
    
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
    },[errors, user]);

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
    },[errors, user]);

    const investmentsTotal = investments?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) ?? 0;
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) ?? 0;
    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) ?? 0;

    const netLabelValue = () => {
        if(!assets || assets?.length === 0) return `No Assets Available`
        else if(assetsTotal - liabilitiesTotal < 0) return `Net Deficiency: $${(liabilitiesTotal-assetsTotal).toLocaleString()}`
        else return `Net Assets: $${(assetsTotal - liabilitiesTotal).toLocaleString()}`
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        if(isEditing) {
            dispatch(usersActions.editUser(user.id, {
                firstName,
                lastName,
                username,
                email
            }))
            .then(() => navigate('/user'))
            .catch( async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors);
                    console.error(errors)
                }
            })
        } setIsEditing(!isEditing)
    };

    const handleEditClick1 = (e) => {
        e.preventDefault();
        if(isEditing1) {
            dispatch(usersActions.editUser(user.id, {
                firstName,
                lastName,
                username,
                email
            }))
            .then(() => navigate('/user'))
            .catch( async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors);
                    console.error(errors)
                }
            })
        } setIsEditing1(!isEditing1)
    };

    const handleEditClick2 = (e) => {
        e.preventDefault();
        if(isEditing2) {
            dispatch(usersActions.editUser(user.id, {
                firstName,
                lastName,
                username,
                email
            }))
            .then(() => navigate('/user'))
            .catch( async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors);
                    console.error(errors)
                }
            })
        } setIsEditing2(!isEditing2)
    };

    const handleEditClick3 = (e) => {
        e.preventDefault();
        if(isEditing3) {
            dispatch(usersActions.editUser(user.id, {
                firstName,
                lastName,
                username,
                email
            }))
            .then(() => navigate('/user'))
            .catch( async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors);
                    console.error(errors)
                }
            })
        } setIsEditing3(!isEditing3)
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();
        setModalContent(<DeleteUserInvestmentModal userId={user?.id} closeModal={closeModal}/>)
    }


    return (
        <div id='userForm-container'>
            <form action="" >
                <label htmlFor="">
                    First Name:
                    <div>
                    <input type="text" 
                    value={firstName}
                    disabled={!isEditing}
                    onChange={(e) => setFirstName(e.target.value)}
                    /> <button className='edit-button'onClick={handleEditClick} >{isEditing === false ? 'Edit' : 'Save'}</button>
                    </div>
                </label>
                <label htmlFor="">
                    Last Name:
                    <div>
                    <input type="text"
                    value={lastName}
                    disabled={!isEditing1}
                    onChange={(e) => setLastName(e.target.value)}
                    /> <button className='edit-button' onClick={handleEditClick1} >{isEditing1 === false ? 'Edit' : 'Save'}</button>
                    </div>
                </label>
                <label htmlFor="">
                    Username:
                    <div>
                    <input type="text"
                    value={username}
                    disabled={!isEditing2}
                    onChange={(e) => setUsername(e.target.value)}
                    /> <button className='edit-button'onClick={handleEditClick2} >{isEditing2 === false ? 'Edit' : 'Save'}</button>
                    </div>
                </label>
                <label htmlFor="">
                    Email:
                    <div>
                    <input type="text"
                    value={email}
                    disabled={!isEditing3}
                    onChange={(e) => setEmail(e.target.value)}
                    /> <button className='edit-button'onClick={handleEditClick3} >{isEditing3 === false ? 'Edit' : 'Save'}</button>
                    </div>
                </label>
                <label htmlFor="">Total Investments: {investments?.length}</label>
                <label htmlFor="">Investments Value: ${investmentsTotal.toLocaleString() ?? 0}</label>
                <label htmlFor="">Total Assets: {assets?.length}</label>
                <label htmlFor="">Assets Value: ${assetsTotal.toLocaleString() ?? 0}</label>
                <label htmlFor="">Total Liabilities: {liabilities?.length}</label>
                <label htmlFor="">Liabilities Value: ${liabilitiesTotal.toLocaleString() ?? 0}</label>
                <label htmlFor="">{netLabelValue()}</label> 
                <button id='delete-button' onClick={handleDeleteUser}>Delete Account</button>
            </form>

        </div>
    )
}

export default UserProfilePage;