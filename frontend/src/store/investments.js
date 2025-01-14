import { csrfFetch } from "./csrf";

const GET_INVESTMENTS = 'investments/getInvestments';
const CREATE_INVESTMENT = 'investments/create';
const UPDATE_INVESTMENT = 'investments/edit';
const DELETE_INVESTMENT = 'investments/delete';

const getInvestments = () => {
    return {
        type: GET_INVESTMENTS,
    }
};

const createInvestment = (investment) => {
    return {
        type: CREATE_INVESTMENT,
        payload: investment
    }
};

const updateInvestment = (investment) => {
    return {
        type: UPDATE_INVESTMENT,
        payload: investment
    }
}

const destroyInvestment = () => {
    return {
        type: DELETE_INVESTMENT,
    }
};


export const currentInvestments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/investments`, {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(getInvestments(data.Investments));
    return response;
};

export const create = (investment) => async (dispatch) => {
    const { investment_name, type, amount, length } = investment;
    const response = await csrfFetch('/api/investments/create', {
        method: 'POST',
        body: JSON.stringify({
            investment_name,
            type,
            amount,
            length
    })
});

    const data = await response.json();
    dispatch(createInvestment(data.investment));
    return response
};

export const edit = (investmentId, investment) => async (dispatch) => {
    const { investment_name, type, amount, length } = investment;
    const response = await csrfFetch(`/api/investments/${investmentId}/edit`, {
        method: 'PUT',
        body: JSON.stringify({
            investment_name,
            type,
            amount,
            length
    })
});

    const data = await response.json();
    dispatch(updateInvestment(data.investment));
    return response
};

export const deleteInvestment = (investmentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/investments/${investmentId}/delete`, {
        method: 'DELETE'
    });
    dispatch(destroyInvestment());
    return response
}

const initialState = { investment: null, investments: [] };

const investmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVESTMENTS:
            return { ...state, investments: action.payload};
        case CREATE_INVESTMENT:
            return { ...state, investment: action.payload};
        case UPDATE_INVESTMENT:
            return { ...state, investment: action.payload};
        case DELETE_INVESTMENT:
            return { ...state, investment: null };
        default:
            return state;
    }
};

export default investmentsReducer;