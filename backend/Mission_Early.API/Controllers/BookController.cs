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
        public IEnumerable<Book> GetBooks()
        {
            string? favBookType = Request.Cookies["FavoriteBookType"];
            Console.WriteLine("===COOKIE===\n" + favBookType);

            HttpContext.Response.Cookies.Append("favoriteBookType", "Historical", new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(1)
            });

            return _context.Books.ToList();
        }

    }
}
