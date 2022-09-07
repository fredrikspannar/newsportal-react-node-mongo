
export const ARTICLES_SET = "ARTICLES_SET";
export const ARTICLES_LOADING = "ARTICLES_LOADING";
export const ARTICLES_ERROR = "ARTICLES_ERROR";

export const ArticleListReducer = (state, action) => {
    switch(action.type) {
        case ARTICLES_LOADING:
            return {
                ...state,

                isLoading: true,
                error: false
            }

        case ARTICLES_ERROR:
            return {
                ...state,

                isLoading: false,
                error: action.payload
            }

        case ARTICLES_SET:
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

