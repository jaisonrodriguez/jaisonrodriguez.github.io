import { Toaster } from 'sonner'
import AnimatedBackground from './components/AnimatedBackground'
import ProjectCard from './components/ProjectCard'
import ContactForm from './components/ContactForm'
import { FaFileAlt, FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const projects = [
  {
    title: "Viabot (API & CRM)",
    role: "Arquitecto Full-Stack",
    date: "Proyecto Propio",
    description: "Ecosistema B2B para agencias de viajes. Backend con arquitectura Zero Trust (Supabase, BullMQ, Redis) y CRM Frontend altamente accesible para agentes de ventas senior.",
    tags: ["Next.js 14", "Node.js", "Supabase", "Redis", "BullMQ", "Sabre API"],
    bullets: [
      "Integración de Sabre Gateway y delegación híbrida de WhatsApp (Bots + Humano).",
      "UX extrema: Dictado por voz, inicio sin contraseñas (OAuth) y bóveda interna PDF."
    ]
  },
  {
    title: "Libranza CRM (Micrep)",
    role: "Desarrollador Principal",
    date: "Abr 2026 – Presente",
    description: "Plataforma B2B para gestión operativa. Automatiza la prospección, cálculo de capacidades de crédito y administración de cartera con protección de datos basada en roles.",
    tags: ["React/Vite", "TypeScript", "Supabase", "jsPDF", "XLSX"],
    bullets: [
      "Herramientas de cotización, panel central (Vista 360) y generación automatizada de contratos.",
      "Seguridad de nivel bancario con Control de Acceso (RBAC) y RLS estricto."
    ],
    link: "https://micrep-crm.vercel.app/"
  },
  {
    title: "ArtDesign E-commerce",
    role: "Desarrollador Principal",
    date: "Abr 2026 – Presente",
    description: "Plataforma e-commerce completa con autenticación multicapa. Sistema de 3 roles con RLS en PostgreSQL y sincronización en tiempo real con Zoho CRM.",
    tags: ["React", "Vite", "Supabase", "PostgreSQL", "Wompi", "Python"],
    bullets: [
      "Autenticación y Edge Functions para pasarela Wompi mitigando Zero-Day local.",
      "Pipeline ETL en Python para carga masiva CSV → Supabase."
    ],
    link: "https://github.com/jaisonrodriguez/Pagina_ArtDesing---copia"
  },
  {
    title: "ZajunaBot — Herramienta RPA",
    role: "Desarrollador de Automatización",
    date: "Ene 2026 – Presente",
    description: "Herramienta de automatización RPA para Moodle (Zajuna). Navegación desatendida, inyección de JS para filtrado en el DOM y sistema tolerante a fallos.",
    tags: ["Python", "Playwright", "JavaScript", "PyInstaller", "Gemini AI"],
    bullets: [
      "Automatización con Inteligencia Artificial (Google Gemini).",
      "Empaquetado como ejecutable (.exe) y protección por Machine ID."
    ]
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-10">
          <div className="glass p-8 rounded-3xl sticky top-10 shadow-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-white">Jaison <br/>Rodríguez</h1>
            <p className="text-blue-400 font-medium text-lg mb-8">Desarrollador Full-Stack &<br/>Analista de Datos</p>

            <div className="space-y-4 mb-8">
              <a href="mailto:jaisonrodriguez@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition">
                <FaEnvelope size={18} /> jaisonrodriguez@gmail.com
              </a>
              <a href="https://wa.me/573239306599" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition">
                <FaPhone size={18} /> +57 323 930 6599
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <FaMapMarkerAlt size={18} /> Pasto, Nariño, Colombia
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/jaisonrodriguez" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/j4150nrodriguez" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
              <a href="https://jaisonrodriguez-github-io.vercel.app/" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition">
                <FaFileAlt size={20} />
              </a>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <section className="w-full lg:w-2/3 space-y-20">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Perfil Profesional
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Desarrollador Full-Stack y Analista de Datos con experiencia construyendo soluciones en producción. Especializado en diseñar ecosistemas web escalables (Zero Trust), automatización mediante IA/RPA (Python) y optimización de bases de datos. Historial comprobado detectando vulnerabilidades críticas y transformando requerimientos de negocio complejos en arquitecturas seguras y accesibles.
            </p>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Proyectos Destacados
              <div className="h-px bg-slate-700 flex-grow"></div>
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} index={idx} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-4">
              Contacto
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
