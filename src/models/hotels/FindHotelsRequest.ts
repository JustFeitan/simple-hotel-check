export interface FindHotelsRequest {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    limit?: number | 10;
    page?: number | 1;
}
