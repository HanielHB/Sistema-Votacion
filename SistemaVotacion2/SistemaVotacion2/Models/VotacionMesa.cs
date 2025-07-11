using System;

namespace SistemaVotacion2.Models
{
    public class VotacionMesa
    {
        public int Id { get; set; }

        public int MesaId { get; set; }
        public Mesa Mesa { get; set; }

        public int VotanteId { get; set; }
        public Votante Votante { get; set; }

        public DateTime FechaVoto { get; set; }
    }

}