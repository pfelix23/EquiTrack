import { csrfFetch } from "./csrf";

const CREATE_ASSET = 'assets/create';

const newAsset = (asset) => {
    return {
        action: CREATE_ASSET,
        payload: asset
    }
};

export const create = (asset) => async (dispatch) => {
    const { asset_name, type, amount } = asset;
    const response = await csrfFetch('/api/assets/create', {
        method: 'POST',
        body: JSON.stringify({
            asset_name,
            type,
            amount
        })
    });
        const data = await response.json();
        dispatch(newAsset(data.asset));
        return response;
}

const initialState = {asset: null}

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ASSET:
            return { ...state, asset: action.payload}
        default:
            return state;
    }

};

export default assetsReducer