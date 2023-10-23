import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types";
import "./styles.css";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <img src={book.coverUrl} alt={book.name} />
      <h3>{book.name}</h3>
    </Link>
  );
};

export default BookCard;
