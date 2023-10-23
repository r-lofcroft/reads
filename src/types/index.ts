export interface Book {
  id: string;
  name: string;
  genre: string;
  coverUrl: string;
  description: string;
  averageRating: number;
  haveRead: number;
  currentlyReading: number;
  wantToRead: number;
  userRating: number;
  status?: string;
}

export interface NewBook {
  name: string;
  genre: string;
  coverUrl: string;
  description: string;
}

export interface BookRating {
  bookId: string;
  rating: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  accessToken: string;
}

export interface UserData {
  id: string;
  username: string;
  shelf: [
    {
      bookId: string;
      status: string;
    }
  ];
}
