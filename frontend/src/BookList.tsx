import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
<<<<<<< HEAD
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?resultLength=${pageSize}&pageNumber=${pageNum}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems]);

  const sortBooksByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
      if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setBooks(sortedBooks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
=======

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/Book/AllBooks', {
        credentials: 'include',
      });
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);
>>>>>>> 96aed7cbb91fd9adb3f63729982857d4157b8222

  return (
    <>
      <h1>Book List</h1>
      <br />
<<<<<<< HEAD
      <button onClick={sortBooksByTitle}>
        Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
=======
      {books.map((b) => (
        <div id="bookCard">
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>Number of Pages: {b.pageCount}</li>
            <li>Price: {b.price}</li>
            <li>ISBN: {b.isbn}</li>
          </ul>
        </div>
      ))}
>>>>>>> 96aed7cbb91fd9adb3f63729982857d4157b8222
    </>
  );
}

export default BookList;
