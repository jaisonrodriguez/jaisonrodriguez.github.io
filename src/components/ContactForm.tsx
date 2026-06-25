import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Schema Validation with Zod
const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un correo válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Sanitize Inputs (Defending against XSS before hypothetical API dispatch)
      const cleanMessage = DOMPurify.sanitize(data.message);
      
      console.log("Sanitized submission:", { ...data, message: cleanMessage });
      
      toast.success('¡Mensaje enviado con éxito!', {
        description: 'Me pondré en contacto contigo a la brevedad.',
      });
      reset();
    } catch (error) {
      toast.error('Hubo un error al enviar el mensaje');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo</label>
        <input
          {...register('name')}
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
          {...register('email')}
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
          {...register('message')}
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
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
