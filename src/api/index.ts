import {
  AuthResponse,
  Book,
  NewBook,
  UserCredentials,
  UserData,
} from "../types";

const BASE_URL = "https://devies-reads-be.onrender.com";

export const addBook = (book: NewBook): Promise<Response> =>
  fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

export const getAllBooks = (): Promise<Book[]> =>
  fetch(`${BASE_URL}/books`).then((res) => res.json());

export const getOneBook = (id: string): Promise<Book> =>
  fetch(`${BASE_URL}/books/${id}`).then((res) => res.json());

export const userLogin = (
  credentials: UserCredentials
): Promise<AuthResponse> => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to log in");
    }
    return res.json();
  });
};

export const userRegister = (
  credentials: UserCredentials
): Promise<AuthResponse> => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to register");
    }
    return res.json();
  });
};

export const addToShelf = (
  userId: string,
  bookDetails: { bookId: string; status: string },
  accessToken: string
): Promise<Response> =>
  fetch(`${BASE_URL}/users/${userId}/shelf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookDetails),
  });

export const updateShelf = (
  userId: string,
  bookDetails: { bookId: string; status: string },
  accessToken: string
): Promise<Response> =>
  fetch(`${BASE_URL}/users/${userId}/shelf`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bookDetails),
  });

export const rateBook = (
  userId: string,
  ratingDetails: { bookId: string; rating: number },
  accessToken: string
): Promise<Response> =>
  fetch(`${BASE_URL}/books/${userId}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(ratingDetails),
  });

export const isBookInShelf = async (
  userId: string,
  bookId: string,
  accessToken: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await response.json();
    return user.shelf.some(
      (book: { bookId: string; status: string }) => book.bookId === bookId
    );
  } catch (error) {
    console.error("Error checking if book is in shelf:", error);
    return false;
  }
};

export const isLoggedIn = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/is-logged-in`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to check logged-in status");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error checking logged-in status:", error);
    return false;
  }
};

export const getUser = async (
  userId: string,
  accessToken: string
): Promise<UserData> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data: UserData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
