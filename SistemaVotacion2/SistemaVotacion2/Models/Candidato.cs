using System;
using System.Collections.Generic;
using SistemaVotacion2.Models;

namespace SistemaVotacion2.Models
{
    public class Candidato
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Partido { get; set; }

        public ICollection<Voto> Votos { get; set; }
    }
}
