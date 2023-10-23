import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookList from "./components/BookList";
import AuthForm from "./pages/AuthForm";
import BookDetails from "./pages/BookDetails";

import "./App.css";
import MyBooks from "./pages/MyBooks";
import { AuthProvider } from "./AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
