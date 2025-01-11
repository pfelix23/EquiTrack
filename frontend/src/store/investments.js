import { csrfFetch } from "./csrf";

const GET_INVESTMENTS = 'investments/getInvestments';

const getInvestments = (investments) => {
    return {
        type: GET_INVESTMENTS,
        payload: investments
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

const initialState = { investment: null, investments: [] };

const investmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVESTMENTS:
            return { ...state, investments: action.payload};
        default:
            return state;
    }
};

export default investmentsReducer;