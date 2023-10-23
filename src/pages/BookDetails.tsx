import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

import {
  addToShelf,
  getOneBook,
  isBookInShelf,
  rateBook,
  updateShelf,
} from "../api";
import { Book } from "../types";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [readingStatus, setReadingStatus] = useState<string>("haveRead");
  const [rating, setRating] = useState<number>(0);
  const { loggedIn, userId, accessToken } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await getOneBook(String(id));
        setBook(fetchedBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleReadingStatusChange = async () => {
    try {
      if (!userId || !id || !accessToken) {
        throw new Error("User ID or access token is missing");
      }

      const bookDetails = { bookId: id, status: readingStatus };

      const isOnShelf = await isBookInShelf(userId, id, accessToken);

      if (isOnShelf) {
        await updateShelf(userId, bookDetails, accessToken);
      } else {
        await addToShelf(userId, bookDetails, accessToken);
      }
    } catch (error) {
      console.error("Error updating reading status:", error);
    }
  };

  const handleRatingChange = async () => {
    try {
      if (!userId || !accessToken || !id) {
        throw new Error("User ID, access token, or book ID is missing");
      }

      const ratingDetails = { bookId: id, rating };

      await rateBook(userId, ratingDetails, accessToken);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details-container">
      <img src={book.coverUrl} alt={book.name} />
      <h2>{book.name}</h2>
      <p>{book.description}</p>
      {loggedIn && (
        <div className="interaction-section">
          <div className="reading-status">
            <select
              value={readingStatus}
              onChange={(e) => setReadingStatus(e.target.value)}
            >
              <option value="read">Have Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
            </select>
            <button onClick={handleReadingStatusChange}>Add to Shelf</button>
          </div>

          <div className="rating">
            <span>Rate this book:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
                <label htmlFor={`star${star}`}>{star}</label>
              </span>
            ))}
            <button onClick={handleRatingChange}>Rate</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
