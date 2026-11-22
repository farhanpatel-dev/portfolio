/**
 * ============================================================================
 *  PORTFOLIO CONTENT: edit this file to update the site.
 * ============================================================================
 *  Every piece of text, link and list on the site comes from here, so you
 *  never need to touch component code to change your details.
 *
 *  Source: resume/Farhan_Patel_Resume_v2 (Nov 2026).
 *
 *  Rules the components follow:
 *   - An empty string ('') or null hides that item (no broken links shown).
 *   - Skill and tech names are matched to brand icons in src/data/techIcons.js.
 *     A name with no brand icon gets a fitting generic icon automatically.
 *
 *  After editing: commit and push to `main`, and GitHub Actions redeploys.
 * ============================================================================
 */

// ---- Identity -------------------------------------------------------------
export const profile = {
  name: 'Farhan Patel',
  initials: 'FP',
  title: 'Software Engineer',
  // Phrases cycled by the typing effect in the hero.
  roles: [
    'Software Engineer',
    'Python Backend Engineer',
    'Machine Learning in Production',
    'Geospatial APIs & PostGIS',
  ],
  tagline: 'Reliable Python services and machine learning models, built for production.',
  // Small badge under the portrait. Set to '' to hide it.
  availability: 'Open to new roles',
  summary:
    'Software engineer focused on building reliable Python services and putting machine learning models into production. Bringing 2.5 years at Mobifilia across event-driven microservices, geospatial REST APIs and CI/CD, plus an M.Sc. in Computer Science (4.0 GPA) with deep learning and computer vision work.',
  // Extra About paragraph, written only from facts on the resume.
  aboutExtra:
    'Most recently I completed my M.Sc. in Computer Science at Western University, with coursework in Data Management, Deep Learning for Computer Vision, Artificial Intelligence and Unstructured Data.',
  siteUrl: 'https://farhanpatel-dev.github.io/portfolio/',
  resumeFile: 'resume.pdf', // lives in /public
};

// ---- Hero code card -------------------------------------------------------------
// The editor window in the hero renders these values as a small Python class.
export const codeCard = {
  filename: 'farhan.py',
  className: 'SoftwareEngineer',
  focus: ['Python services', 'ML in production', 'Geospatial APIs'],
  stack: ['FastAPI', 'PostgreSQL/PostGIS', 'RabbitMQ', 'PyTorch', 'Docker'],
  motto: 'Ship reliable systems.',
};

// ---- Contact ----------------------------------------------------------------
export const contact = {
  email: 'farhanpatel1802@gmail.com',
  // Phone is intentionally left out of the public site (and this public repo).
  // To show it: fill both fields, e.g. phone: '+1XXXXXXXXXX' (used for the
  // tel: link) and phoneDisplay: '(XXX) XXX-XXXX', then set showPhone: true.
  phone: '',
  phoneDisplay: '',
  showPhone: false,
  location: 'Canada',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canada',
  linkedin: 'https://www.linkedin.com/in/patel-farhan',
  github: 'https://github.com/farhanpatel-dev',
  // Formspree form id (the part after formspree.io/f/). Leave '' to fall back
  // to opening the visitor's email app with the message pre-filled.
  formspreeId: '', // TODO: create a free form at formspree.io and paste its id
};

// ---- Quick stats (About section) ---------------------------------------------
// `value` animates as a count-up. Technologies is computed from `skills` below.
export const stats = [
  { label: 'Years at Mobifilia', value: 2.5, decimals: 1, suffix: '' },
  { label: 'Faster geospatial queries', value: 40, suffix: '%' },
  { label: 'M.Sc. GPA', value: 4.0, decimals: 1, suffix: '' },
  { label: 'Technologies', value: 'auto', suffix: '+' },
];

// ---- Skills (grouped exactly as on the resume) -------------------------------
export const skills = [
  {
    category: 'Backend',
    items: ['Python', 'C#', 'FastAPI', 'Flask', '.NET Core', 'Pydantic', 'SQLAlchemy', 'Alembic', 'Socket.IO', 'REST APIs'],
  },
  {
    category: 'Data & Messaging',
    items: ['SQL', 'PostgreSQL/PostGIS', 'MongoDB', 'MySQL', 'RabbitMQ', 'MinIO', 'ETL', 'Power BI'],
  },
  {
    category: 'Cloud & Delivery',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'GitLab CI', 'Microsoft Azure', 'pytest', 'Git', 'Swagger'],
  },
  {
    category: 'Machine Learning',
    items: ['PyTorch', 'ONNX Runtime', 'MLflow', 'OpenCV', 'scikit-learn', 'Pandas', 'NumPy', 'PyMuPDF', 'Shapely', 'rasterio'],
  },
  {
    category: 'Practices',
    items: ['Microservices', 'Event-driven design', 'JWT/RBAC', 'Agile', 'Code review'],
  },
];

// ---- Experience (newest first) -----------------------------------------------
export const experience = [
  {
    company: 'Mobifilia Software LLP',
    initials: 'MS',
    location: '', // TODO (optional): city of the Mobifilia office
    url: '', // TODO (optional): company website
    roles: [
      {
        title: 'Software Engineer',
        start: 'Jun 2023',
        end: 'Jul 2025',
        achievements: [
          'Added live document status tracking to an event-driven OCR and AI extraction pipeline (Flask, RabbitMQ, MongoDB change streams), letting users follow each document from upload to extraction.',
          'Built a reusable GitHub Actions release workflow that bumps semantic versions from merged PR titles and pushes tagged Docker images to GHCR, ending manual release tagging across services.',
          'Built OTP login with expiry, resend limits and rate limiting, JWT access/refresh tokens, and a reusable FastAPI RBAC dependency that scopes agents, managers and admins to their own data.',
          'Designed incremental sync APIs for a field-agent mobile app that return only records changed since the last sync, cutting data transfer over low-bandwidth rural networks.',
          'Reduced geospatial query latency by 40% on 1M+ records by serving zoom-level simplified geometries with GiST indexes and bounding-box filtering in PostGIS.',
          'Built the field approval and rejection workflow and manager dashboard APIs, and owned PostgreSQL schema design and Alembic migrations, all reviewed through GitLab merge requests.',
        ],
      },
      {
        title: 'Software Engineer Intern',
        start: 'Jan 2023',
        end: 'Jun 2023',
        achievements: [
          'Developed a C# (.NET Core) point-of-sale system on PostgreSQL, containerized with Docker and documented in Swagger.',
          'Integrated Razorpay and QR-code payment workflows, resulting in 17% faster checkout and 5% fewer transaction failures.',
        ],
      },
    ],
  },
];

// ---- Projects -----------------------------------------------------------------
export const projects = [
  {
    name: 'GA4 Ecommerce Funnel, Attribution & Anomaly Analytics',
    date: 'Nov 2026',
    description:
      'Product and marketing analytics on a GA4-schema ecommerce export (856k events) run locally on DuckDB, from a sessionized SQL library to a Streamlit dashboard and a stakeholder readout.',
    highlights: [
      'Wrote a sessionized SQL library over nested GA4 event_params and items, with a BigQuery-style dry run that reports files and bytes scanned before every query.',
      'Located a 38% mobile conversion gap at the payment and purchase steps with Holm-corrected z-tests, sized at ~$33k (17% of revenue), and caught a one-day mobile payment outage with robust STL anomaly detection.',
      'Compared five attribution models (incl. exact Markov removal effect and Shapley) and split revenue changes exactly with an LMDI metric tree; validated every method against planted ground truth across 56 tests.',
    ],
    tech: ['Python', 'SQL', 'DuckDB', 'Pandas', 'Streamlit', 'pytest'],
    repoPath: 'farhanpatel-dev/ga4-ecommerce-analytics',
    code: 'https://github.com/farhanpatel-dev/ga4-ecommerce-analytics',
    live: '',
  },
  {
    name: 'Consumer Complaint Warehouse & Hybrid Search',
    date: 'Nov 2026',
    description:
      'A PostgreSQL + pgvector warehouse over the CFPB Consumer Complaint Database (19.2M complaints) that serves both analytics and hybrid keyword + semantic search.',
    highlights: [
      'Built idempotent ingestion from three CFPB sources and a dbt star schema with SCD Type 2 dimensions and a monthly partitioned fact table over 19.2M complaints.',
      'Wrote a resumable GPU embedding job that embedded 5.6M narrative chunks (bge-base, 768-d) at ~360 chunks/s, committing each batch and its checkpoint in one transaction.',
      'Served Reciprocal Rank Fusion hybrid search from a single SQL function behind FastAPI; benchmarked HNSW halfvec at 0.904 recall@100 in 17.5 ms with half the index size of float32.',
    ],
    tech: ['Python', 'PostgreSQL/pgvector', 'dbt', 'FastAPI', 'Docker', 'pytest'],
    repoPath: 'farhanpatel-dev/complaint-warehouse',
    code: 'https://github.com/farhanpatel-dev/complaint-warehouse',
    live: '',
  },
  {
    name: 'Aerial Crop-Stress Detection & Mapping Platform',
    date: 'Nov 2026',
    description:
      'A U-Net model that finds crop stress in aerial imagery, served through a FastAPI microservice that returns georeferenced GeoJSON polygons.',
    highlights: [
      'Trained a U-Net segmentation model with a pretrained ResNet34 encoder on 75K+ aerial images, improving mIoU by 13% over the initial model through regularization; tracked experiments in MLflow.',
      'Built a stateless FastAPI inference microservice that tiles imagery, runs an ONNX-exported model and returns georeferenced GeoJSON polygons, validated for exact output parity with PyTorch.',
      'Cut CPU inference time by 25% by tuning tile batching and threading, achieving sub-second predictions on standard 512 px images; containerized with Docker and covered by pytest unit and API tests.',
    ],
    tech: ['PyTorch', 'ONNX Runtime', 'FastAPI', 'rasterio', 'MLflow', 'Docker', 'pytest'],
    repoPath: 'farhanpatel-dev/cropwatch', // shown as the card's terminal path
    code: 'https://github.com/farhanpatel-dev/cropwatch',
    live: '', // TODO (optional): live demo URL; button stays hidden while empty
  },
];

// ---- Education ------------------------------------------------------------------
export const education = [
  {
    degree: 'M.Sc. Computer Science',
    institution: 'Western University',
    location: 'London, ON',
    start: 'Sep 2025',
    end: 'Sep 2026',
    detail: 'GPA 4.0/4.0',
    coursework: ['Data Management', 'Deep Learning for Computer Vision', 'Artificial Intelligence', 'Unstructured Data'],
    url: 'https://www.uwo.ca/',
  },
  {
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Sanjay Ghodawat University',
    location: 'India',
    start: 'Aug 2019',
    end: 'May 2023',
    detail: '',
    coursework: [],
    url: 'https://www.sguk.ac.in/',
  },
];

// None on the resume yet. Add { name, issuer, date, url } objects to show the block.
export const certifications = [];

// ---- Section copy (headings shown on the site) --------------------------------
export const sections = {
  about: { eyebrow: 'about', title: 'Engineering that', accent: 'holds up' },
  skills: { eyebrow: 'skills', title: 'My tech', accent: 'stack' },
  experience: { eyebrow: 'experience', title: "Where I've", accent: 'shipped' },
  projects: { eyebrow: 'projects', title: "Things I've", accent: 'built' },
  education: { eyebrow: 'education', title: 'Where I', accent: 'studied' },
  contact: {
    eyebrow: 'contact',
    title: "Let's build something",
    accent: 'together',
    intro: "I'm open to software engineering roles. Send a note and I'll get back to you.",
  },
};

// Navigation order (ids must match section ids).
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
