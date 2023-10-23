import React, { useEffect, useState } from "react";
import { getUser, getOneBook } from "../api";
import { Book, UserData } from "../types";
import { useAuth } from "../AuthContext";

const MyBooks: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const { loggedIn, userId, accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        if (!userId || !accessToken) {
          throw new Error("User ID or access token is missing");
        }
        const user = await getUser(userId, accessToken);
        setUserData(user);

        // Fetch each book based on bookId and populate the 'books' state
        const fetchedBooks: Book[] = [];
        for (let item of user.shelf) {
          const book = await getOneBook(item.bookId);
          fetchedBooks.push({ ...book, status: item.status }); // adding the status to each book
        }
        setBooks(fetchedBooks);
      }
    };

    fetchData();
  }, [accessToken]);

  if (!loggedIn) return <div>You need to be logged in to view this page.</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Books I've Read</h2>
      {books
        .filter((book) => book.status === "haveRead")
        .map((book) => (
          <div key={book.id}>
            <img src={book.coverUrl} alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.userRating ? book.userRating : "Not rated"}</p>
          </div>
        ))}

      <h2>Books I Want to Read</h2>
      {books
        .filter((book) => book.status === "wantToRead")
        .map((book) => (
          <div key={book.id}>
            <img src={book.coverUrl} alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.userRating ? book.userRating : "Not rated"}</p>
          </div>
        ))}

      <h2>Books I'm Currently Reading</h2>
      {books
        .filter((book) => book.status === "currentlyReading")
        .map((book) => (
          <div key={book.id}>
            <img src={book.coverUrl} alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.userRating ? book.userRating : "Not rated"}</p>
          </div>
        ))}
    </div>
  );
};

export default MyBooks;
