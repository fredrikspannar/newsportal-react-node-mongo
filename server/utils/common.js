
export const hasValidFields = (requiredFields, input) => {
    return requiredFields.every( (field) => {

            // only check if it exists and is not empty
            return input[field] !== undefined && input[field].toString().length > 0;
            
        });
};