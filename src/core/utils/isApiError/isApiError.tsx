import { IErrorMessage } from "../../models/error";

export function isApiError(error: unknown): error is IErrorMessage {
    return (
        !!(error as IErrorMessage).message && !!(error as IErrorMessage).code
    );
}
