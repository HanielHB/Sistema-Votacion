using System;


namespace SistemaVotacion2.Models
{
    public class Votante
    {
        public int Id { get; set; }
        public string CI { get; set; }  // Carnet de Identidad
        public string NombreCompleto { get; set; }
       public bool HaVotado { get; set; }
    }
}
