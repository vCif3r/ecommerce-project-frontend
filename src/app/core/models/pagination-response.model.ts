export interface PaginationResponse<T> {
    data: T[];
    meta: {
        page: number;
        total: number;
    }
}