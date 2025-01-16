import { csrfFetch } from "./csrf";

const CREATE_LIABILITY = 'liabilities/create';
const DELETE_LIABILITY = 'liabilities/delete';

const newLiability = (liability) => {
    return {
        action: CREATE_LIABILITY,
        payload: liability
    }
};

const destroyLiability= () => {
    return {
        type: DELETE_LIABILITY,
    }
};

export const create = (liability) => async (dispatch) => {
    const { liability_name, type, amount } = liability;
    const response = await csrfFetch('/api/liabilities/create', {
        method: 'POST',
        body: JSON.stringify({
            liability_name,
            type,
            amount
        })
    });
        const data = await response.json();
        dispatch(newLiability(data.liability));
        return response;
};

export const deleteLiability = (liabilityId) => async (dispatch) => {
    const response = await csrfFetch(`/api/liabilities/${liabilityId}/delete`, {
        method: 'DELETE'
    });
    dispatch(destroyLiability());
    return response
}

const initialState = {liability: null}

const liabilitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIABILITY:
            return { ...state, liability: action.payload};
        case DELETE_LIABILITY:
            return { ...state, liability: null };
        default:
            return state;
    }

};

export default liabilitiesReducer