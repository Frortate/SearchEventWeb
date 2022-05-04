using System;
using System.Collections.Generic;

#nullable disable

namespace SerachEventWeb
{
    public partial class City
    {
        public City()
        {
            Places = new HashSet<Place>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Place> Places { get; set; }
    }
}
