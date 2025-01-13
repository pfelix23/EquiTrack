import { csrfFetch } from "./csrf";

const EDIT_USER = 'users/edit';
const DELETE_USER = 'users/delete'

const edit = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    };
};

const destroyUser = () => {
    return {
        type: DELETE_USER,
    }
}
export const editUser = (userId, user) => async (dispatch) => {
    const { firstName, lastName, username, email } = user;
    const response = await csrfFetch(`/api/users/${userId}/edit`, {
        method: "PUT",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email
        })
    });
    const data = await response.json();
    dispatch(edit(data.user));
    return response;
}

export const deleteUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/delete`, {
        method: 'DELETE'
    });
    dispatch(destroyUser());
    return response
}

const initialState = { user: null }

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER:
            return { ...state, user: action.payload };
        case DELETE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default usersReducer;