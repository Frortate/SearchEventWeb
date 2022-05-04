using System;
using System.Collections.Generic;

#nullable disable

namespace SerachEventWeb
{
    public partial class Age
    {
        public Age()
        {
            Events = new HashSet<Event>();
        }

        public int Id { get; set; }
        public int Age1 { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}
