
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  status: "borrowed" | "returned";
};

export type BorrowRecord = {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  returnDate: string | null;
};
