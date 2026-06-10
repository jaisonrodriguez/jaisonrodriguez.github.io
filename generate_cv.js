const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  LevelFormat, ExternalHyperlink, TabStopType, TabStopPosition,
  VerticalAlign, UnderlineType
} = require('docx');
const fs = require('fs');

// ── Color palette ──────────────────────────────────────────────────────────
const DARK   = "1A1A2E";  // navy dark
const ACCENT = "D91E8A";  // rosa ArtDesign
const MID    = "374151";  // gris medio
const LIGHT  = "6B7280";  // gris suave

// ── Helpers ────────────────────────────────────────────────────────────────
const rule = (color = "E5E7EB", size = 4) =>
  new Paragraph({
    paragraph: {
      border: { bottom: { style: BorderStyle.SINGLE, size, color, space: 1 } }
    },
    spacing: { after: 0, before: 0 },
    children: [],
  });

const spacer = (pt = 80) =>
  new Paragraph({ spacing: { before: pt, after: 0 }, children: [] });

const sectionHeader = (text) => [
  spacer(160),
  new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 22,
        color: DARK,
        font: "Arial",
      }),
    ],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } },
    spacing: { before: 0, after: 120 },
  }),
];

const bullet = (text, bold_prefix = null) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: bold_prefix
      ? [
          new TextRun({ text: bold_prefix + " ", bold: true, size: 20, font: "Arial", color: MID }),
          new TextRun({ text, size: 20, font: "Arial", color: MID }),
        ]
      : [new TextRun({ text, size: 20, font: "Arial", color: MID })],
  });

const jobHeader = (title, company, period, location = null) => {
  const left = `${title}  |  ${company}`;
  const right = period + (location ? `  ·  ${location}` : "");
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
    spacing: { before: 140, after: 40 },
    children: [
      new TextRun({ text: left, bold: true, size: 22, font: "Arial", color: DARK }),
      new TextRun({ text: "\t" + right, size: 18, font: "Arial", color: LIGHT }),
    ],
  });
};

const skillRow = (category, items) =>
  new TableRow({
    children: [
      new TableCell({
        width: { size: 2200, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        },
        shading: { fill: "F9FAFB", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({
          children: [new TextRun({ text: category, bold: true, size: 18, font: "Arial", color: DARK })],
        })],
      }),
      new TableCell({
        width: { size: 7160, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        },
        shading: { fill: "F9FAFB", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({
          children: [new TextRun({ text: items, size: 18, font: "Arial", color: MID })],
        })],
      }),
    ],
  });

// ── Document ───────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 440, hanging: 220 } } },
        }],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20, color: MID } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    children: [

      // ── NAME & CONTACT ─────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [
          new TextRun({ text: "JAISON RODRÍGUEZ", bold: true, size: 52, font: "Arial", color: DARK }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({ text: "Desarrollador Full-Stack  ·  Analista de Datos", size: 24, font: "Arial", color: ACCENT }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 180 },
        children: [
          new TextRun({ text: "Pasto, Nariño, Colombia  ·  +57 323 930 6599  ·  jaisonrodriguez@gmail.com  ·  ", size: 18, font: "Arial", color: LIGHT }),
          new TextRun({ text: "github.com/jaisonrodriguez", size: 18, font: "Arial", color: ACCENT, underline: { type: UnderlineType.SINGLE } }),
          new TextRun({ text: "  ·  ", size: 18, font: "Arial", color: LIGHT }),
          new TextRun({ text: "jaisonrodriguez.github.io", size: 18, font: "Arial", color: ACCENT, underline: { type: UnderlineType.SINGLE } }),
        ],
      }),

      // RULE
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 1 } },
        spacing: { before: 0, after: 160 },
        children: [],
      }),

      // ── PERFIL ─────────────────────────────────────────────────────────
      ...sectionHeader("Perfil Profesional"),
      new Paragraph({
        spacing: { before: 60, after: 0 },
        children: [
          new TextRun({
            text: "Desarrollador Full-Stack y Analista de Datos con más de 5 años de experiencia construyendo soluciones de producción. He diseñado y desplegado una plataforma e-commerce completa (React + Supabase + Wompi) con autenticación multicapa, integración CRM en tiempo real y pasarela de pagos para el mercado colombiano. Experiencia probada en Python, SQL y automatización de procesos — incluyendo la detección y corrección de una vulnerabilidad de seguridad crítica en producción. Me especializo en convertir necesidades de negocio reales en sistemas funcionales, escalables y bien documentados.",
            size: 20, font: "Arial", color: MID,
          }),
        ],
      }),

      // ── PROYECTOS ──────────────────────────────────────────────────────
      ...sectionHeader("Proyectos de Portafolio"),

      // ArtDesign
      jobHeader("Desarrollador Principal", "ArtDesign E-commerce — Proyecto Propio", "Abr 2026 – Presente", "Pasto, Colombia"),
      new Paragraph({
        spacing: { before: 20, after: 60 },
        children: [
          new TextRun({ text: "artdesigntienda.vercel.app", size: 18, font: "Arial", color: ACCENT, underline: { type: UnderlineType.SINGLE } }),
          new TextRun({ text: "  ·  ", size: 18, font: "Arial", color: LIGHT }),
          new TextRun({ text: "github.com/jaisonrodriguez/Pagina_ArtDesing---copia", size: 18, font: "Arial", color: ACCENT, underline: { type: UnderlineType.SINGLE } }),
          new TextRun({ text: "  ·  Stack: React/Vite · Supabase · PostgreSQL · Wompi · Python · GCS", size: 18, font: "Arial", color: LIGHT }),
        ],
      }),
      bullet("Diseñé e implementé arquitectura full-stack con autenticación multicapa: Google OAuth, OTP por WhatsApp, reCAPTCHA v3 y Google Places API. Sistema de 3 roles (admin / asesora / cliente) con RLS en PostgreSQL."),
      bullet("Detecté y corregí vulnerabilidad de seguridad crítica: la firma HMAC-SHA256 de Wompi se generaba en el cliente exponiendo el secreto en el bundle JS. Migré el proceso a una Edge Function de Supabase, eliminando el vector de ataque."),
      bullet("Implementé sincronización en tiempo real entre Supabase Realtime y Zoho CRM mediante listeners de Postgres Changes, automatizando el registro de pedidos sin intervención manual."),
      bullet("Construí generador de catálogo PDF (jsPDF) con navegación indexada, precios diferenciados por rol y routing dinámico por asesora, procesando 132+ productos."),
      bullet("Desarrollé pipeline ETL en Python para carga masiva de productos CSV → Supabase con upsert por clave única, manejo de conflictos y extracción de URLs desde Google Cloud Storage."),

      spacer(80),

      // ZajunaBot
      jobHeader("Desarrollador", "ZajunaBot — Herramienta de Automatización RPA", "2026", "Producto de Software Comercializado"),
      new Paragraph({
        spacing: { before: 20, after: 60 },
        children: [
          new TextRun({ text: "Stack: Python · Playwright · JavaScript · PyInstaller - Proyecto Propio Monetizado", size: 18, font: "Arial", color: LIGHT }),
        ],
      }),
      bullet("Automaticé flujos repetitivos en Moodle (Zajuna) usando Python + Playwright: navegación desatendida, extracción de sesskeys, modificación masiva de fechas de entrega y restricciones de acceso."),
      bullet("Implementé inyección de JavaScript para filtrado inteligente en el DOM, discriminando entre recursos visuales y actividades evaluables mediante análisis de atributos HTML."),
      bullet("Diseñé sistema tolerante a fallos con reintentos automáticos y esperas dinámicas para manejar latencias extremas del servidor de la plataforma."),
      bullet("Empaqué la solución como ejecutable .exe multiplataforma con PyInstaller para usuarios sin conocimientos técnicos, eliminando dependencias de entorno."),

      // ── EXPERIENCIA LABORAL ────────────────────────────────────────────
      ...sectionHeader("Experiencia Laboral"),

      jobHeader("Analista de Datos", "Mi Crep SAS", "Nov 2021 – Nov 2025", "Modalidad hibrida / por objetivos"),
      bullet("Ejecuto extracción, transformación y modelado de datos financieros y operativos con Python, SQL y Java sobre bases MySQL y SQL Server."),
      bullet("Optimicé consultas complejas en SQL Server reduciendo tiempos de respuesta del sistema en operaciones de reporte recurrentes."),
      bullet("Aplico modelos de análisis estadístico y machine learning (scikit-learn) para identificación de patrones y oportunidades de negocio."),

      spacer(60),
      jobHeader("Pasante SENA — Etapa Productiva", "Corporación Mundial de la Mujer Colombia", "May 2025 – Nov 2025"),
      bullet("Desarrollé y optimicé el sistema CRM institucional, mejorando la gestión de relaciones con clientes y automatizando procesos internos."),
      bullet("Diseñé procesos ETL para integración, depuración y normalización de bases de datos desde múltiples fuentes heterogéneas."),
      bullet("Construí dashboards interactivos en Power BI con KPIs estratégicos para monitoreo institucional y toma de decisiones."),

      spacer(60),
      jobHeader("Asesor de Crédito / Automatización", "Nexabpo", "Mar 2020 – Nov 2020"),
      bullet("Automaticé consultas complejas y estructuré generación de reportes recurrentes para seguimiento ágil de KPIs de crédito."),

      spacer(60),
      jobHeader("Analista de Libranza y Datos", "Kreditplus / Consultorías Financieras", "Jun 2017 – Sep 2019"),
      bullet("Preparación, extracción y modelado de datos financieros con SQL SSMS, Power Query, Power Pivot y Power BI para soporte de decisiones operativas."),

      // ── STACK TÉCNICO ──────────────────────────────────────────────────
      ...sectionHeader("Stack Técnico"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE },
        },
        rows: [
          skillRow("Frontend",       "React, Vite, JavaScript (ES2022+), HTML5, CSS3, Tailwind"),
          skillRow("Backend / BaaS", "Supabase (Auth · Postgres · Edge Functions · Realtime), Node.js"),
          skillRow("Lenguajes",      "Python, SQL, Java, JavaScript"),
          skillRow("Datos & BI",     "Pandas, scikit-learn, Power BI, Power Query, Power Pivot, Excel"),
          skillRow("Cloud & DevOps", "Google Cloud Storage, Git, GitHub, Linux (Mint)"),
          skillRow("Automatización", "Playwright, RPA, PyInstaller, Power Automate"),
          skillRow("Bases de datos", "PostgreSQL, MySQL, SQL Server (SSMS), Firebase"),
          skillRow("Integraciones",  "Wompi, Zoho CRM, Google OAuth, reCAPTCHA v3, Google Places API, Resend"),
        ],
      }),

      // ── EDUCACIÓN ──────────────────────────────────────────────────────
      ...sectionHeader("Educación y Certificaciones"),

      new Paragraph({
        spacing: { before: 60, after: 30 },
        children: [
          new TextRun({ text: "Análisis y Desarrollo de Software (Titulado)", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "  ·  SENA", size: 20, font: "Arial", color: LIGHT }),
        ],
      }),
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({ text: "Gestión de Mercados (Titulado)", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "  ·  SENA", size: 20, font: "Arial", color: LIGHT }),
        ],
      }),
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({ text: "Rutas de formación:", bold: true, size: 20, font: "Arial", color: DARK }),
          new TextRun({ text: "  Python, SQL, Power Automate, Visualización de Datos  ·  Platzi (2023)", size: 20, font: "Arial", color: LIGHT }),
        ],
      }),

      // ── COMPETENCIAS ───────────────────────────────────────────────────
      ...sectionHeader("Competencias Clave"),
      new Paragraph({
        spacing: { before: 60, after: 0 },
        children: [
          new TextRun({ text: "Resolución de problemas técnicos de producción  ·  Diseño de arquitecturas orientadas a negocio  ·  Detección proactiva de vulnerabilidades de seguridad  ·  Autodisciplina y aprendizaje autónomo de nuevas tecnologías  ·  Documentación técnica y comunicación con equipos no técnicos  ·  Inglés básico (lectura técnica)", size: 20, font: "Arial", color: MID }),
        ],
      }),

    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Hoja_de_Vida_Jaison_Rodriguez.docx", buffer);
  console.log("✅ CV generado correctamente en Hoja_de_Vida_Jaison_Rodriguez.docx");
});
