import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const cleanMessage = DOMPurify.sanitize(data.message);
      console.log('Sanitized submission:', { ...data, message: cleanMessage });
      toast.success('¡Mensaje enviado con éxito!', {
        description: 'Me pondré en contacto contigo a la brevedad.',
      });
      reset();
    } catch {
      toast.error('Hubo un error al enviar el mensaje');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo</label>
        <input
          {...register('name', {
            required: 'Por favor ingresa tu nombre',
            minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
          })}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-2">
            {errors.name.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Correo Electrónico</label>
        <input
          {...register('email', {
            required: 'Por favor ingresa tu correo electrónico',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Por favor ingresa un correo electrónico válido',
            },
          })}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-2">
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
        <textarea
          {...register('message', {
            required: 'Por favor escribe tu mensaje',
            minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
          })}
          rows={4}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="¿En qué puedo ayudarte?"
        ></textarea>
        {errors.message && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-2">
            {errors.message.message}
          </motion.p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Enviar Mensaje <FaPaperPlane size={18} />
          </>
        )}
      </button>
    </form>
  );
}
