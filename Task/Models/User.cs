namespace Task.Models
{
   
        public class User
        {
            public int Id { get; set; }

            public string Emri { get; set; }

            public string Email { get; set; }

            public ICollection<Taski> Tasks { get; set; }
        }
}
