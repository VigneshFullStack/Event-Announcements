import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import "../App.css";
import StatusCode from "../utils/StatusCode";
import NoResultsFound from "../assets/no-results-found.png";
import EventsComponent from "./Events";

function PressReleaseComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const itemsPerPage = 4;
  const { data: news, status } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to format date in the specified format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "types") {
      const firstType = newsTypes[0]; // Get the first type
      setSelectedType(firstType); // Set it as the selected type
    } else {
      setSelectedType(null); // Reset selectedType if tab is not 'types'
    }
    setCurrentPage(1);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? item.type === selectedType : true;
    const matchesYear =
      selectedYear === "All" ||
      new Date(item.date).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesType && matchesYear;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  useEffect(() => {
    if (news.length > 0) {
      setSelectedItem(news[0]);
    }
  }, [news]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIdx, startIdx + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // if (status === StatusCode.LOADING || !news) {
  //     return (
  //         <div className="loader">
  //             <div>
  //                 <div className="loader-circle"></div>
  //                 <span className="loader-text">Loading...</span>
  //             </div>
  //         </div>
  //     );
  // }

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
          disabled={currentPage === 1}
        >
          <span className="arrow">← </span>
          <span className="nav-text">PREV</span>
        </button>
        <span className="pages">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn ${
                number === currentPage ? "page-number active" : "page-number"
              }`}
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
          disabled={currentPage === totalPages}
        >
          <span className="nav-text">NEXT</span>
          <span className="arrow"> →</span>
        </button>
      </div>
    );
  };

  // Get types from the news data
  const newsTypes = [...new Set(news.map((item) => item.type))];

  // Get unique years from the news data
  const years = [
    ...new Set(news.map((item) => new Date(item.date).getFullYear())),
  ].sort((a, b) => b - a);

  return (
    <div className="container-fluid">
      <div className="row mt-3 mb-5">
        <div className="col-xl-5">
          <div className="text-center">
            <h3 className="text-secondary mb-4 title">PRESS RELEASES</h3>
          </div>
          <div className="row">
            <div className="col-md-7" style={{ padding: "0" }}>
              <form className="search-container">
                <input
                  type="text"
                  id="search-bar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by title or type..."
                />
                <a href="#">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </a>
              </form>
            </div>
            <div className="col-md-5 dropdown">
              <select
                style={{ height: "45px" }}
                className="form-select"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="All">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="tabs mt-5 mb-4 d-flex justify-content-center">
            {searchTerm === "" && (
              <>
                <button
                  className={`tab ${
                    activeTab === "all"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }`}
                  onClick={() => handleTabChange("all")}
                >
                  All
                </button>
                <button
                  className={`tab ${
                    activeTab === "types"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }`}
                  onClick={() => handleTabChange("types")}
                >
                  By Type
                </button>
              </>
            )}
          </div>
          {searchTerm === "" && activeTab === "types" && (
            <div className="types my-3 d-flex justify-content-center">
              {newsTypes.map((type) => (
                <button
                  style={{ width: "auto", borderRadius: "20px" }}
                  key={type}
                  className={`${
                    selectedType === type
                      ? "btn btn-secondary"
                      : "btn btn-outline-secondary"
                  }`}
                  onClick={() => handleTypeClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          {status === StatusCode.LOADING ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <div className="skeleton" key={index}>
                <div className="skeleton-left">
                  <div className="line h17 w40 m10"></div>
                  <div className="line"></div>
                  <div className="line h8 w50"></div>
                  <div className="line  w75"></div>
                </div>
                <div className="skeleton-right">
                  <div className="square"></div>
                </div>
              </div>
            ))
          ) : currentNews.length > 0 ? (
            currentNews.map((item) => (
              <div
                className={`row ${
                  selectedItem?.ID === item.ID
                    ? "news-item-current news-item-helper"
                    : "news-item news-item-helper"
                }`}
                key={item.ID}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
              >
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-1" style={{ marginTop: "3px" }}>
                      <i
                        className="fa-solid fa-calendar-days text-secondary"
                        style={{ fontSize: "20px", fontWeight: "normal" }}
                      ></i>
                    </div>
                    <div className="col-11">
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "16px",
                        }}
                      >
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="col-1" style={{ marginTop: "5px" }}>
                      <i
                        className="fa-solid fa-bookmark"
                        style={{ fontSize: "20px", fontWeight: "normal" }}
                      ></i>
                    </div>
                    <div className="col-11">
                      <a
                        href="#"
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {item.title}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 type">
                  <h3
                    className="fw-bold badge bg-light text-dark"
                    style={{ marginBottom: "0", fontSize: "14px" }}
                  >
                    {item.type}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="row mt-3">
              <div className="col-12">
                <img
                  src={NoResultsFound}
                  className="no-result-img"
                  alt="No results found"
                />
              </div>
            </div>
          )}
          {filteredNews.length > itemsPerPage && renderPagination()}
        </div>
        <div className="col-xl-7">
          <div className="text-center events">
            {/* <div></div> */}
            <h3 className="text-secondary mb-4 title">EVENTS</h3>
            {/* <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}
                            title="logout"></i> */}
          </div>
          <EventsComponent selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default PressReleaseComponent;
