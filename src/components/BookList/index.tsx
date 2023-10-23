import React, { useState, useEffect } from "react";
import { getAllBooks } from "../../api";
import { Book } from "../../types";
import BookCard from "../BookCard";
import "./styles.css";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterGenre, setFilterGenre] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortMethod) {
      case "haveRead":
        return b.haveRead - a.haveRead;
      case "currentlyReading":
        return b.currentlyReading - a.currentlyReading;
      case "wantToRead":
        return b.wantToRead - a.wantToRead;
      case "userRating":
        return b.userRating - a.userRating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const filteredBooks = sortedBooks.filter((book) => {
    const matchesSearch = book.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = !filterGenre || book.genre === filterGenre;

    return matchesSearch && matchesGenre;
  });

  // Get unique genres from the books
  const genres = Array.from(
    new Set(books.map((book) => book.genre).filter((genre) => genre))
  );

  return (
    <div>
      <div className="sorting-container">
        <div>
          <p>Search</p>
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Sort</p>
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
          >
            <option value="">Default</option>
            <option value="haveRead">Have Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="userRating">User Rating</option>
          </select>
        </div>
      </div>

      <div className="books-container">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
