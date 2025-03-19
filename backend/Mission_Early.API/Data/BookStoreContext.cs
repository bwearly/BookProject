using Microsoft.EntityFrameworkCore;

namespace Mission11_Early.API.Data
{
    public class BookStoreContext : DbContext
    {
        public BookStoreContext(DbContextOptions<BookStoreContext> options) : base(options)
        { 
        }

        public DbSet<Book> Books { get; set; }
    }
}
