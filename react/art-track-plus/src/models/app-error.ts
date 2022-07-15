class AppError {

    constructor(obj: any) {
        if (!obj) {
            return;
        }

        [
            this.id,
            this.message
        ] = obj;
    }

    id: number;
    message: string;
}

export default AppError;