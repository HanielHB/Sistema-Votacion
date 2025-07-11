using System;

namespace SistemaVotacion2.Models
{
    public class Administrador
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string PasswordHash { get; set; }
    }
}

