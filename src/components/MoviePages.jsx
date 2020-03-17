import React from 'react';

function MoviePages({changePage, page, totalPages}) {

    const onChangeButtonClick = (num) => {
        changePage(num);
    };
    return (
        <div className="row col-12">
            <button
                className="btn btn-secondary"
                onClick={onChangeButtonClick.bind(null, -1)}
                disabled={page === 1}
            >
                Prev. Page
            </button>
            <p className="m-2">{`Page ${page} of ${totalPages}`}</p>
            <button
                className="btn btn-secondary"
                onClick={onChangeButtonClick.bind(null, 1)}
                disabled={page === 500}>
                Next. Page
            </button>
        </div>
    );
}

export default MoviePages;