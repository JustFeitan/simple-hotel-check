import { AxiosError } from "axios";

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
    return typeof error === "object" && error !== null && "message" in error;
};
export const isAxiosErrorResponse = (error: any): error is AxiosError => {
    return error instanceof AxiosError;
};
export function toAxiosError(error: any): AxiosError {
    return new AxiosError(error.message, error.config, error.code, error.request, error.response);
}
