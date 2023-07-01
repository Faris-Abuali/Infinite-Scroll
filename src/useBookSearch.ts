import {useEffect, useState} from "react";
import axios from "axios";
import {BookQueryResponse} from "./types";

const useBookSearch = (query: string, pageNumber: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [books, setBooks] = useState<Array<string>>([]);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        setBooks([]); // Reset books when query changes
    }, [query]);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        let cancel = () => console.log("Request canceled");

        axios<BookQueryResponse>({
            method: 'GET',
            url: 'https://openlibrary.org/search.json',
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setBooks(prevBooks => {
                const books = [...prevBooks, ...res.data.docs.map(doc => doc.title)];
                // Titles may not be unique, so we need to filter them
                return [...new Set(books)];
            });

            setHasMore(res.data.docs.length > 0);
            setIsLoading(false);
            console.log(res.data);
        }).catch(e => {
            if (axios.isCancel(e)) return; // Ignore errors due to canceled requests
            setIsError(true);
        });

        return () => cancel();
    }, [query, pageNumber]);


    return {
        isLoading,
        isError,
        hasMore,
        books,
    }
};

export default useBookSearch;
