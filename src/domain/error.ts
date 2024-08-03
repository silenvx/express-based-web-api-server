export type ErrorObject = {
    message: string;
    hasError: boolean;
};

export const noError = (): ErrorObject => {
    return {
        message: "",
        hasError: false
    }
}

export const error = (message: string): ErrorObject => {
    return {
        message,
        hasError: true
    }
}
