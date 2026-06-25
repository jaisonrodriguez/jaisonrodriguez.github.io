import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

interface ProjectProps {
  project: {
    title: string;
    role: string;
    date: string;
    description: string;
    tags: string[];
    bullets: string[];
    link?: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl p-8 relative overflow-hidden group transition-all duration-300 hover:border-blue-500/50"
    >
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
          <p className="text-blue-500 font-medium">{project.role}</p>
        </div>
        <div className="mt-2 md:mt-0 px-3 py-1 bg-slate-800/80 rounded-full text-xs font-semibold tracking-wider text-slate-300 border border-slate-700">
          {project.date}
        </div>
      </div>

      <p className="text-slate-300 mb-6 leading-relaxed">
        {project.description}
      </p>

      <ul className="space-y-3 mb-8">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
            <FaCheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs font-medium text-blue-300">
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <div className="mt-auto">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30"
          >
            Ver Proyecto <FaExternalLinkAlt size={16} />
          </a>
        </div>
      )}
    </motion.article>
  );
}
