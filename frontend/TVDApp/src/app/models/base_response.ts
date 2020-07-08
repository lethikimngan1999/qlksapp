export class BaseResponse<T> {
    public Status: boolean;
    public Data: T;
    public Error: Error;
}

class Error {
    public code: string;
    public message: string;
}
