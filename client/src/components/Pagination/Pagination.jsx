import React, { useState, useEffect } from 'react';
import './Pagination.scss'

function Pagination({ pages, setCurrentPage , currentPage}) {
    //pasar las props desde el padre directamente
    console.log('de pagination', pages, currentPage)
    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);
    }
    //setCurrentPage(1)
    const [currentButton, setCurrentButton] = useState(1);
    const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState([]);

    useEffect(() => {
        //setCurrentPage(1)
        console.log('use effect')
        let tempNumberOfPages = [...arrOfCurrentButtons]
        const dotsInitial = '...'
        const dotsLeft = '...'
        const dotsRight = '...'

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages;
        }
        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }
        else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5);
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }
        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
        }
        else if (currentButton > numberOfPages.length - 3) {
            const sliced = numberOfPages.slice(numberOfPages.length - 4)
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }
        else if (currentButton === dotsInitial) {
            setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length - 3] + 1)
        }
        else if (currentButton === dotsRight) {
            setCurrentButton(arrOfCurrentButtons[3] + 2)
        }
        else if (currentButton === dotsLeft) {
            setCurrentButton(arrOfCurrentButtons[3] - 2)
        }

        setArrOfCurrentButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
        //setCurrentButton(currentPage)
    }, [currentButton]
    //[currentPage]
    )
    
    return (
        <div className="pagination-container">
            <a
                className={`${currentButton === 1 ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
            >
                Prev
            </a>

            {arrOfCurrentButtons.map((item, index) => {
                console.log('boton',currentButton, item)
                return (
                    <a
                        key={index}
                        className={`${currentButton === item ? 'active' : ''}`}
                        onClick={() => setCurrentButton(item)}

                    >
                        {item}
                    </a>

                )
            })}

            <a
                className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
            >
                Next
            </a>
        </div>
    )
}

export default Pagination;
