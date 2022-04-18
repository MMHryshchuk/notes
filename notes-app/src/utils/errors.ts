import { AxiosError } from "axios";

export const isAxiosError = (error: unknown): error is AxiosError =>
    (error as AxiosError).isAxiosError;

export const createAxiosError = (error: AxiosError): AxiosError => {
    const newError = new Error(error.message) as AxiosError;
    newError.response = error.response;
    newError.request = error.request;
    newError.config = error.config;
    if (error.code) {
        newError.code = error.code;
    }

    return newError;
};
