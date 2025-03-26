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

            string? favBookType = Request.Cookies["FavoriteBookType"];
            Console.WriteLine("===COOKIE===\n" + favBookType);

            HttpContext.Response.Cookies.Append("favoriteBookType", "Historical", new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(1)
            });

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
    }
}