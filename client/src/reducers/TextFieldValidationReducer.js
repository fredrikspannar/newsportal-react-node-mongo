
export const TEXTFIELD_SET = "TEXTFIELD_SET";
export const TEXTFIELD_ERROR = "TEXTFIELD_ERROR";

export const TextFieldValidationReducer = (state, action) => {
    switch(action.type) {
        case TEXTFIELD_SET:
            return {
                ...state,

                data: action.payload,
                error: false
            }

        case TEXTFIELD_ERROR:
                return {
                    ...state,
    
                    error: action.payload
                }

        default:
            return state;
    }
};