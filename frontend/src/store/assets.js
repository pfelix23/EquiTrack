import { csrfFetch } from "./csrf";

const CREATE_ASSET = 'assets/create';
const DELETE_ASSET = 'assets/delete';

const newAsset = (asset) => {
    return {
        action: CREATE_ASSET,
        payload: asset
    }
};

const destroyAsset = () => {
    return {
        type: DELETE_ASSET,
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
};

export const deleteAsset = (assetId) => async (dispatch) => {
    const response = await csrfFetch(`/api/assets/${assetId}/delete`, {
        method: 'DELETE'
    });
    dispatch(destroyAsset());
    return response
}

const initialState = {asset: null}

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ASSET:
            return { ...state, asset: action.payload};
        case DELETE_ASSET:
            return { ...state, asset: null };
        default:
            return state;
    }

};

export default assetsReducer