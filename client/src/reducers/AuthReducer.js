
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const AuthReducer = (state, action) => {
    switch(action.type) {
        case AUTH_LOGIN:
            return {         
                ...action.payload
            }
            
        case AUTH_LOGOUT:
            return { }

        default:
            return state;
    }
};
