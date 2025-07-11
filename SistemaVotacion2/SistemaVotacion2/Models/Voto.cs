using System;

namespace SistemaVotacion2.Models
{
    public class Voto
    {
        public int Id { get; set; }

        // FK: Papeleta
        public int PapeletaId { get; set; }
        public Papeleta Papeleta { get; set; }

        // FK: Candidato
        public int CandidatoId { get; set; }

        public Candidato Candidato { get; set; }

        public DateTime FechaRegistro { get; set; }
    }
}