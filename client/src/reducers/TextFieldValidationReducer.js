
export const TEXTFIELD_SET = "TEXTFIELD_SET";
export const TEXTFIELD_ERROR = "TEXTFIELD_ERROR";
export const TEXTFIELD_DISABLED = "TEXTFIELD_DISABLED";
export const TEXTFIELD_RESET = "TEXTFIELD_RESET";

export const TextFieldValidationReducer = (state, action) => {
    switch(action.type) {
        case TEXTFIELD_RESET:
            return {
                ...state,

                disabled: false,
                error: false
            }

        case TEXTFIELD_DISABLED:
            return {
                ...state,

                disabled: true
            }

        case TEXTFIELD_SET:
            return {
                ...state,

                data: action.payload,
                error: false,
                disabled: false
            }

        case TEXTFIELD_ERROR:
                return {
                    ...state,
    
                    error: action.payload,
                    disabled: false
                }

        default:
            return state;
    }
};