import { Toaster } from 'sonner'
import AnimatedBackground from './components/AnimatedBackground'
import ProjectCard from './components/ProjectCard'
import ContactForm from './components/ContactForm'
import {
  FaFileAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaDownload,
  FaDatabase,
  FaCode,
  FaServer,
  FaGraduationCap,
} from 'react-icons/fa'

const projects = [
  {
    title: "AgendaClick — Plataforma SaaS Comercial",
    role: "Arquitecto & Desarrollador Full-Stack",
    date: "Jul 2024 – Presente",
    description: "Plataforma SaaS en producción para automatización de citas, pagos y gestión de reservas en negocios de servicios. Arquitectura escalable con pasarela bancaria y sincronización en tiempo real.",
    tags: ["Next.js (App Router)", "TypeScript", "PostgreSQL", "Supabase", "Wompi API", "Google Calendar API", "Tailwind CSS"],
    bullets: [
      "Modelado relacional en PostgreSQL (Supabase) con seguridad a nivel de fila (RLS), triggers y optimización SQL.",
      "Integración de pasarela de pagos Wompi con validación de firmas de integridad SHA-256 en backend.",
      "Sincronización bidireccional en tiempo real con Google Calendar API y sistema de autenticación OTP antifraude."
    ],
    link: "https://www.agendaclick.com.co/"
  },
  {
    title: "ZajunaBot — Herramienta RPA",
    role: "Creador & Desarrollador RPA",
    date: "Ene 2026 – Presente",
    description: "Software de automatización robótica de procesos (RPA) para plataformas Moodle (Zajuna). Navegación desatendida, inyección dinámica en el DOM y compilación autónoma.",
    tags: ["Python", "Playwright", "JavaScript", "PyInstaller", "RPA"],
    bullets: [
      "Inyección de JavaScript para filtrado inteligente de recursos y actividades evaluables en el DOM.",
      "Arquitectura tolerante a fallos con reintentos automáticos y esperas dinámicas ante latencias del servidor.",
      "Compilación y empaquetado como ejecutable autónomo (.exe) sin dependencias externas."
    ]
  },
  {
    title: "ArtDesign E-commerce",
    role: "Desarrollador Full-Stack & Datos",
    date: "Proyecto Comercial",
    description: "Plataforma e-commerce completa con autenticación multicapa, sincronización en tiempo real y catálogo PDF dinámico para más de 130 productos.",
    tags: ["React/Vite", "TypeScript", "Supabase", "PostgreSQL", "Wompi", "Python", "Zoho CRM"],
    bullets: [
      "Detección y remediación de vulnerabilidad migrando generación de firmas Wompi a Edge Functions seguras.",
      "Pipeline ETL en Python para ingesta, limpieza y carga masiva de productos CSV → PostgreSQL.",
      "Sincronización en tiempo real entre Postgres Changes y Zoho CRM para trazabilidad automatizada."
    ],
    link: "https://github.com/jaisonrodriguez/Pagina_ArtDesing---copia"
  },
  {
    title: "Viabot (API & CRM)",
    role: "Arquitecto Full-Stack",
    date: "Proyecto Propio",
    description: "Ecosistema B2B para agencias de viajes. Backend con arquitectura Zero Trust y CRM frontend altamente accesible para agentes de ventas.",
    tags: ["Next.js", "Node.js", "Supabase", "Redis", "BullMQ", "Sabre API"],
    bullets: [
      "Integración de Sabre Gateway y delegación híbrida de WhatsApp (Bots + Humano).",
      "Bóveda interna de documentos PDF y autenticación segura sin contraseñas (OAuth)."
    ]
  },
  {
    title: "Libranza CRM — Gestión Operativa & Datos",
    role: "Desarrollador & Analista de Datos",
    date: "Plataforma Operativa",
    description: "Plataforma para administración de cartera, cálculo de capacidades de libranza y reportería gerencial en convenios financieros.",
    tags: ["React", "TypeScript", "Supabase", "SQL", "jsPDF", "Excel Avanzado"],
    bullets: [
      "Modelado de datos financieros y control de acceso estricto basado en roles (RBAC).",
      "Herramientas de cotización, liquidación de cuotas y generación automatizada de reportes."
    ]
  }
];

const technicalSkills = [
  {
    category: "Desarrollo Web & Frontend",
    icon: FaCode,
    skills: ["React", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3", "Vite"]
  },
  {
    category: "Bases de Datos & Backend",
    icon: FaDatabase,
    skills: ["PostgreSQL", "Supabase (BaaS, RLS)", "SQL (Consultas, Joins, Vistas)", "MySQL", "SQL Server (SSMS)", "APIs REST", "Edge Functions"]
  },
  {
    category: "Automatización & Datos",
    icon: FaServer,
    skills: ["Python (Pandas, Scripts)", "Playwright (RPA)", "Pipelines ETL", "Power BI (DAX, Power Query)", "Excel Avanzado", "PyInstaller"]
  }
];

function App() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      {/* Animated Circuit Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <Toaster position="bottom-right" theme="dark" richColors />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-8">
          <div className="glass p-8 rounded-3xl sticky top-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/Foto_perfil_Jaison.jpg"
                alt="Jaison Rodríguez"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">Jaison Rodríguez</h1>
                <p className="text-blue-400 font-medium text-sm">Desarrollador Full-Stack &<br/>Analista de Datos</p>
              </div>
            </div>

            <div className="space-y-3.5 mb-8 text-sm">
              <a href="mailto:jaisonrodriguez@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition">
                <FaEnvelope size={16} className="text-blue-400 shrink-0" /> jaisonrodriguez@gmail.com
              </a>
              <a href="https://wa.me/573105284116" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition">
                <FaPhone size={16} className="text-green-400 shrink-0" /> +57 310 528 4116
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <FaMapMarkerAlt size={16} className="text-red-400 shrink-0" /> Pasto, Colombia (100% Remoto)
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="/Hoja_de_Vida_Jaison_Rodriguez.pdf"
                download="Hoja_de_Vida_Jaison_Rodriguez_ATS.pdf"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-900/30 text-sm"
              >
                <FaDownload size={14} /> Descargar Hoja de Vida (PDF)
              </a>

              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="https://github.com/jaisonrodriguez"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="p-3 bg-slate-800/80 rounded-xl hover:bg-blue-600 hover:text-white transition text-slate-300 border border-slate-700"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/j4150nrodriguez"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="p-3 bg-slate-800/80 rounded-xl hover:bg-blue-600 hover:text-white transition text-slate-300 border border-slate-700"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://platzi.com/@jaisonrodriguez/"
                  target="_blank"
                  rel="noreferrer"
                  title="Platzi"
                  className="p-3 bg-slate-800/80 rounded-xl hover:bg-green-600 hover:text-white transition text-slate-300 border border-slate-700 font-bold text-xs flex items-center justify-center w-11 h-11"
                >
                  PZ
                </a>
                <a
                  href="https://jaisonrodriguez-github-io.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  title="Portafolio Web"
                  className="p-3 bg-slate-800/80 rounded-xl hover:bg-blue-600 hover:text-white transition text-slate-300 border border-slate-700"
                >
                  <FaFileAlt size={18} />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <section className="w-full lg:w-2/3 space-y-16">
          
          {/* About */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Perfil Profesional
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Desarrollador Full-Stack y Analista de Datos con más de 5 años de trayectoria en arquitectura web, automatización de procesos (RPA en Python) y gestión de bases de datos relacionales en el sector financiero y tecnológico. Experiencia comprobada diseñando y desplegando plataformas SaaS comerciales en producción (<a href="https://www.agendaclick.com.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-semibold">agendaclick.com.co</a>), implementando políticas de seguridad RLS en PostgreSQL, pasarelas de pago con validación criptográfica y flujos ETL de datos. Tecnólogo en Análisis y Desarrollo de Software (SENA ADSO).
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Proyectos Destacados en Producción
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} index={idx} />
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Habilidades Técnicas & Stack
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {technicalSkills.map((cat, i) => {
                const IconComponent = cat.icon;
                return (
                  <div key={i} className="glass-card rounded-2xl p-6 border border-slate-700/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="font-semibold text-white text-sm">{cat.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, j) => (
                        <span key={j} className="px-2.5 py-1 bg-slate-800/80 rounded-md text-xs text-slate-300 border border-slate-700/70">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Formación & Certificaciones
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-5 border border-slate-700/60 flex items-start gap-4">
                <FaGraduationCap size={24} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-white text-base">Tecnólogo en Análisis y Desarrollo de Software (ADSO)</h3>
                  <p className="text-blue-400 text-sm">Servicio Nacional de Aprendizaje (SENA) | En curso</p>
                  <p className="text-slate-400 text-xs mt-1">Arquitectura de software, POO, bases de datos relacionales/no relacionales y metodologías ágiles.</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-slate-700/60 flex items-start gap-4">
                <FaGraduationCap size={24} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-white text-base">Tecnólogo en Gestión de Mercados</h3>
                  <p className="text-blue-400 text-sm">Servicio Nacional de Aprendizaje (SENA) | Graduado (2019)</p>
                  <p className="text-slate-400 text-xs mt-1">Calificación sobresaliente: 4.5/5.0. Código de Verificación SENA: 9301001310103CC1015999360C.</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-slate-700/60 flex items-start gap-4">
                <FaGraduationCap size={24} className="text-blue-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-white text-base">Certificaciones Platzi en Bases de Datos y Ciencia de Datos</h3>
                  <p className="text-blue-400 text-sm">Platzi (2023 - 2024)</p>
                  <p className="text-slate-400 text-xs mt-1">MySQL y MariaDB, Fundamentos de Bases de Datos, Entorno de Ciencia de Datos (Jupyter/Anaconda), Python y Algoritmos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Enviar un Mensaje
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <div className="glass p-8 rounded-3xl">
              <ContactForm />
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default App
