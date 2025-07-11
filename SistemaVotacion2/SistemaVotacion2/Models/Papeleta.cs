using System;


namespace SistemaVotacion2.Models
{
    public class Papeleta
    {
        public int Id { get; set; }

        // FK: Votante
        public int VotanteId { get; set; }
        public Votante Votante { get; set; }

        public DateTime FechaHabilitacion { get; set; }
        public bool EstaActiva { get; set; }

        public ICollection<Voto> Votos { get; set; }

    }
}