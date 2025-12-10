import React, { useEffect, useState } from "react";
import LessonCard from "../../Components/Form/Home/LessonCard";

const PublicLesson = () => {
  const [lessons, setLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const limit = 8;
  const [sort, setsort] = useState("createdAt");
  const [order, setOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
const [tone, setTone] = useState("");


  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/public-lessons?limit=${limit}&skip=${
        currentPage * limit
      }&sort=${sort}&order=${order}&search=${searchText}&category=${category}&tone=${tone}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLessons(data.result);
        setTotalLessons(data.total);
        const page = Math.ceil(data.total / limit);
        console.log(page);
        setTotalPages(page);
      });
  }, [currentPage, order, sort, searchText]);

  const handleSelect = (e) => {
    console.log(e.target.value);
    const sortText = e.target.value;
    // setsort(sortText.split("-")[0]);
    // setOrder(sortText.split("-")[1]);
    setsort(e.target.value);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-6">
        Public Lessons ({totalLessons})
      </h2>
      {/* Search and Count */}
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
        <div>
          <h2 className="text-lg underline font-bold">
            ({totalLessons}) Lessons Found
          </h2>
        </div>

        <form>
          <label className="input max-w-[300px] w-[300px] input-secondary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={handleSearch}
              type="search"
              className=""
              placeholder="Search Apps"
            />
          </label>
        </form>

        <select
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(0);
          }}
          className="select bg-white"
        >
          <option value="all">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationship">Relationship</option>
          <option value="Mistake Learned">Mistake Learned</option>
        </select>

        <select
          onChange={(e) => {
            setTone(e.target.value);
            setCurrentPage(0);
          }}
          className="select bg-white"
        >
          <option value="all">All Tones</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Sad">Sad</option>
          <option value="Motivational">Motivational</option>
        </select>

        {/* Sort */}
        <div className="flex justify-center mt-4">
          <select onChange={handleSelect} className="select bg-white">
            <option disabled selected>
              Sort by <span className="text-xs">R / S / D</span>
            </option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostSaved">Most Saved</option>
          </select>
        </div>
      </div>
      {/* Lessons Grid */}
      {lessons && lessons.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn"
          >
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage ? "btn-primary" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicLesson;
