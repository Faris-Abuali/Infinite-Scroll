export interface Document {
    title: string;
    [key: string]: any;
}

export interface BookQueryResponse {
    docs: Array<Document>;
    numFound: number;
    num_found: number;
    numFoundExact: boolean;
    start: number;
    offset?: number;
    q: string;
}