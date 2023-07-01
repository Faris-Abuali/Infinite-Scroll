import {useState, ChangeEvent, useRef, useCallback} from 'react'
import useBookSearch from "./useBookSearch";

function App() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const {books, hasMore, isError, isLoading} = useBookSearch(query, pageNumber);

    const observer = useRef<IntersectionObserver>();
    /**
     * IntersectionObserver is a browser API that provides a way to asynchronously observe
     * changes in the intersection of a target element with the document's viewport.
     */

    const lastBookElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return; // if loading, don't trigger infinite scrolling

        /**
         * Disconnect our previous observer from the previous element before connecting to a new element
         * This is to prevent memory leaks
         *
         * Disconnect our observer from the previous element, so that we can connect the observer to a new element.
         * This is to prevent our observer from triggering when we scroll past the previous element.
         */
        if (observer.current) observer.current.disconnect(); // disconnect previous observer

        observer.current = new IntersectionObserver(entries => {
            // entries is an array of threshold entries -> in our case, it will only have one element
            // we are only observing one element. If we were observing multiple elements, entries would have multiple elements
            // entries[0] is the first element in the array.

            // isIntersecting is a boolean value that tells us if the element is intersecting the viewport
            // if the element is intersecting the viewport, we want to load more books
            // if the element is not intersecting the viewport, we don't want to load more books
            // we only want to load more books if
            //      1. the element is intersecting the viewport AND
            //      2. if we have more books to load
            if (entries[0].isIntersecting && hasMore) {
                // console.log("Visible");
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });

        if (node) observer.current.observe(node); // connect observer to the new element
    }, [isLoading, hasMore]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPageNumber(1);
    }


    return (
        <>
            <input type="text" value={query} placeholder="Type something here" onChange={handleSearch}/>
            {books.map((book, index) => {
                // if we are at the last book, we want to add a ref to the last book div element
                if (index === books.length - 1) {
                    return <div key={book} ref={lastBookElementRef}>{book}</div>
                }
                return <div key={book}>{book}</div>
            })}
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
        </>
    )
}

export default App
