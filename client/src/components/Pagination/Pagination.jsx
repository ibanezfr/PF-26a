import React, { useState } from 'react';
import './Pagination.scss'

function Pagination({ pages, setCurrentPage }) {


    const [currentButton, setCurrentButton] = useState(1);


    let numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }

    setCurrentPage(currentButton)


    return (
        <div className="pagination-container">
            <button
                className={`${currentButton === 1 ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
            >
                Prev
            </button>

            <button>{currentButton}</button>


            <button
                className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination;
