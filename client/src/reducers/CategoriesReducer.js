
export const CATEGORIES_SET = "CATEGORIES_SET";
export const CATEGORIES_LOADING = "CATEGORIES_LOADING";
export const CATEGORIES_ERROR = "CATEGORIES_ERROR";

export const CategoriesReducer = (state, action) => {
    switch(action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,

                isLoading: true,
                error: false
            }

        case CATEGORIES_ERROR:
            return {
                ...state,

                isLoading: false,
                error: action.payload
            }

        case CATEGORIES_SET:
            return {
                ...state,

                isLoading: false,
                error: false,
                data: action.payload
            }

        default:
            return state;
    }
};
