// Asegúrate de que estos "usings" estén presentes.
using Microsoft.EntityFrameworkCore;
using SistemaVotacion2.Models;
using System.Collections.Generic; // Necesario para ICollection<T>

namespace SistemaVotacion2.Data
{
    public class SistemaVotacion2Context : DbContext
    {
        public SistemaVotacion2Context(DbContextOptions<SistemaVotacion2Context> options)
            : base(options)
        {
        }

        // DbSets (generalmente default! está bien aquí, aunque puedes inicializar con new())
        public DbSet<Candidato> Candidato { get; set; } = default!;
        public DbSet<Mesa> Mesa { get; set; } = default!;
        public DbSet<Papeleta> Papeleta { get; set; } = default!;
        public DbSet<VotacionMesa> VotacionMesa { get; set; } = default!;
        public DbSet<Votante> Votante { get; set; } = default!;
        public DbSet<Voto> Voto { get; set; } = default!;

        // Si tienes propiedades de navegación en tus modelos (ej. ICollection<Voto> en Candidato),
        // y quieres evitar advertencias CS8618, asegúrate de que estén inicializadas
        // o marcadas como anulables (?) en sus respectivas clases de modelo.
        // Por ejemplo, en Candidato.cs: public ICollection<Voto> Votos { get; set; } = new List<Voto>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Puedes añadir configuraciones Fluent API aquí si es necesario
            // Por ejemplo, para relaciones many-to-many o para cambiar nombres de tabla/columna
        }
        public DbSet<SistemaVotacion2.Models.Administrador> Administrador { get; set; } = default!;
    }
}