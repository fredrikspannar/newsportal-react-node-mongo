
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const AuthReducer = (state, action) => {
    switch(action.type) {
        case AUTH_LOGIN:
            return {          
                isAuthenticated: true,
                ...action.payload
            }
            
        case AUTH_LOGOUT:
            return {
                isAuthenticated: false
            }

        default:
            return state;
    }
};
