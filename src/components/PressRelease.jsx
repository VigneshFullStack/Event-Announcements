import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import StatusCode from '../utils/StatusCode';
import NoResultsFound from '../assets/no-results-found.png';
import EventsComponent from './Events';

function PressReleaseComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemsPerPage = 5;
    const { data: news, status } = useSelector(state => state.news);

    // Function to format date in the specified format
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Adding leading zeros if necessary
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDay}-${month}-${year} ${formattedHours}:${formattedMinutes}`;
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (news && news.length > 0) {
            setSelectedItem(news[0]);
        }
    }, [news]);

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentNews = filteredNews.slice(startIdx, startIdx + itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    if (status === StatusCode.LOADING || !news) {
        return (
            <div className="loader">
                <div>
                    <div className="loader-circle"></div>
                    <span className="loader-text">Loading...</span>
                </div>
            </div>
        );
    }

    const renderPagination = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                <button
                    className="nav-text"
                    id="prevPage"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}>
                    <span className="arrow">← </span><span className="nav-text">PREV</span></button>
                <span className="pages">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={`btn ${number === currentPage ? 'page-number active' : 'page-number'}`}
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </button>
                    ))}
                </span>
                <button
                    className="nav-text"
                    id="nextPage"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    <span className="nav-text">NEXT</span><span className="arrow"> →</span></button>
            </div>
        );
    };

    return (
        <div className='container-fluid'>
            <div className="row mt-3 mb-5">
                <div className="col-xl-5">
                    <div className='text-center'><h3 className='text-secondary mb-4 title'>PRESS RELEASES</h3></div>
                    <form className="search-container mb-4">
                        <input type="text"
                            id="search-bar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by title or type..." />
                        <a href="#">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        </a>
                    </form>
                    {currentNews.length > 0 ? (
                        currentNews.map(item => (
                            <div className={`row ${selectedItem?.ID === item.ID ? 'news-item-current news-item-helper' : 'news-item news-item-helper'}`}
                                key={item.ID} onClick={() => handleItemClick(item)}
                                style={{ cursor: 'pointer' }}>
                                <div className='col-md-8'>
                                    <p>{formatDate(item.date)}</p>
                                    <h6><a href="#">{item.title}</a></h6>
                                </div>
                                <div className='col-md-4 type'>
                                    <p className='fw-bold text-secondary'>{item.type}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="row">
                            <div className='col-12'>
                                <img src={NoResultsFound} className='no-result-img' alt="no results found" />
                            </div>
                        </div>
                    )}
                    {filteredNews.length > itemsPerPage && renderPagination()}
                </div>
                <div className="col-xl-7">
                    <div className='text-center'><h3 className='text-secondary mb-4 title'>EVENTS</h3></div>
                    <EventsComponent selectedItem={selectedItem} />
                </div>
            </div>
        </div>
    );
}

export default PressReleaseComponent;
