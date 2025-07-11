using System;

namespace SistemaVotacion2.Models
{

    public class Mesa
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public int TotalVotantesEsperados { get; set; }

        public ICollection<Votante> Votantes { get; set; }
    }
}