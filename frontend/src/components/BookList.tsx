import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?resultLength=${pageSize}&pageNumber=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
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
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Buy
            </button>
          </div>
        </div>
      ))}

      <button
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
        className="btn btn-secondary mt-1"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
          className="btn btn-secondary mt-1"
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
        className="btn btn-secondary mt-1"
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
          className="form-control"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
