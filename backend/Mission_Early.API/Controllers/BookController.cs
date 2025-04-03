using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Early.API.Data;

namespace Mission11_Early.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookStoreContext _context;
        public BookController(BookStoreContext temp)
        {
            _context = temp;   
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int resultLength = 5, int pageNumber = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // string? favBookType = Request.Cookies["FavoriteBookType"];
            // Console.WriteLine("===COOKIE===\n" + favBookType);

            // HttpContext.Response.Cookies.Append("favoriteBookType", "Historical", new CookieOptions
            // {
            //     HttpOnly = true,
            //     Secure = false,
            //     SameSite = SameSiteMode.None,
            //     Expires = DateTime.Now.AddMinutes(1)
            // });

            var totalBooks = query.Count();

            var pagination = query.Skip((pageNumber-1)*resultLength).Take(resultLength).ToList();

            var bookObject = new
            {
                Books = pagination,
                TotalBooks = totalBooks,
            };

            return Ok(bookObject);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books.Select(b => b.Category).Distinct().ToList();

            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) 
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            existingBook.ISBN = updatedBook.ISBN;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);

            if (book == null) {
                return NotFound(new {message = "Book not found"});
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}