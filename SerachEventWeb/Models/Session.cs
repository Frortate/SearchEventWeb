using System;
using System.Collections.Generic;

#nullable disable

namespace SerachEventWeb
{
    public partial class Session
    {
        public int Id { get; set; }
        public int EventsOrganizersId { get; set; }
        public DateTime Date { get; set; }

        public virtual EventsOrganizer EventsOrganizers { get; set; }
    }
}
