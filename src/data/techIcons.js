/**
 * Maps a skill / tech name (as written in portfolio.js) to an icon and colour.
 *
 * - `Icon`  : official brand logo from Simple Icons (react-icons/si) where one
 *             exists, otherwise a fitting generic icon (react-icons/lu).
 * - `color` : the brand's official hex, used on hover in light mode.
 * - `dark`  : optional hover colour for dark mode when the brand colour is too
 *             dark to see on the espresso background.
 * - `brand` : true when Icon is the official logo (these appear in the marquee).
 */
import {
  SiPython, SiDotnet, SiFastapi, SiFlask, SiPydantic, SiSqlalchemy, SiSocketdotio,
  SiPostgresql, SiMongodb, SiMysql, SiRabbitmq, SiMinio, SiDocker, SiGithubactions,
  SiGitlab, SiPytest, SiGit, SiSwagger, SiPytorch, SiOnnx, SiMlflow, SiOpencv,
  SiScikitlearn, SiPandas, SiNumpy, SiJsonwebtokens, SiDuckdb, SiStreamlit,
} from 'react-icons/si';
import {
  LuCode, LuGitMerge, LuNetwork, LuDatabase, LuWorkflow, LuChartBar, LuCloud,
  LuFileText, LuShapes, LuMap, LuBoxes, LuZap, LuRefreshCw, LuGitPullRequest, LuCpu,
} from 'react-icons/lu';

const icons = {
  // Backend
  Python: { Icon: SiPython, color: '#3776AB', brand: true },
  'C#': { Icon: LuCode, color: '#68217A', dark: '#B07CC6' }, // no official mark in Simple Icons
  FastAPI: { Icon: SiFastapi, color: '#009688', brand: true },
  Flask: { Icon: SiFlask, color: '#000000', dark: '#F3EBDD', brand: true },
  '.NET Core': { Icon: SiDotnet, color: '#512BD4', dark: '#9B7BFF', brand: true },
  Pydantic: { Icon: SiPydantic, color: '#E92063', brand: true },
  SQLAlchemy: { Icon: SiSqlalchemy, color: '#D71F00', dark: '#FF6A4D', brand: true },
  Alembic: { Icon: LuGitMerge, color: '#7A5C3E', dark: '#D4BC96' },
  'Socket.IO': { Icon: SiSocketdotio, color: '#010101', dark: '#F3EBDD', brand: true },
  'REST APIs': { Icon: LuNetwork, color: '#B08A5B', dark: '#C9A227' },

  // Data & Messaging
  SQL: { Icon: LuDatabase, color: '#B08A5B', dark: '#C9A227' },
  'PostgreSQL/PostGIS': { Icon: SiPostgresql, color: '#4169E1', dark: '#7D9BFF', brand: true },
  'PostgreSQL/pgvector': { Icon: SiPostgresql, color: '#4169E1', dark: '#7D9BFF' },
  dbt: { Icon: LuWorkflow, color: '#FF694B' }, // brand mark not in this react-icons version
  DuckDB: { Icon: SiDuckdb, color: '#C9A227', dark: '#FFF000', brand: true }, // brand yellow is too pale on the light theme
  Streamlit: { Icon: SiStreamlit, color: '#FF4B4B', brand: true },
  MongoDB: { Icon: SiMongodb, color: '#47A248', brand: true },
  MySQL: { Icon: SiMysql, color: '#4479A1', dark: '#7FB0D6', brand: true },
  RabbitMQ: { Icon: SiRabbitmq, color: '#FF6600', brand: true },
  MinIO: { Icon: SiMinio, color: '#C72E49', dark: '#F0607A', brand: true },
  ETL: { Icon: LuWorkflow, color: '#B08A5B', dark: '#C9A227' },
  'Power BI': { Icon: LuChartBar, color: '#C9A227', dark: '#F2C811' }, // brand mark not in Simple Icons

  // Cloud & Delivery
  Docker: { Icon: SiDocker, color: '#2496ED', brand: true },
  'Docker Compose': { Icon: SiDocker, color: '#2496ED' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF', brand: true },
  'GitLab CI': { Icon: SiGitlab, color: '#FC6D26', brand: true },
  'Microsoft Azure': { Icon: LuCloud, color: '#0078D4', dark: '#4DA3FF' }, // brand mark not in Simple Icons
  pytest: { Icon: SiPytest, color: '#0A9EDC', brand: true },
  Git: { Icon: SiGit, color: '#F05032', brand: true },
  Swagger: { Icon: SiSwagger, color: '#85EA2D', brand: true },

  // Machine Learning
  PyTorch: { Icon: SiPytorch, color: '#EE4C2C', brand: true },
  'ONNX Runtime': { Icon: SiOnnx, color: '#005CED', dark: '#5C9BFF', brand: true },
  MLflow: { Icon: SiMlflow, color: '#0194E2', brand: true },
  OpenCV: { Icon: SiOpencv, color: '#5C3EE8', dark: '#9C88FF', brand: true },
  'scikit-learn': { Icon: SiScikitlearn, color: '#F7931E', brand: true },
  Pandas: { Icon: SiPandas, color: '#150458', dark: '#E70488', brand: true },
  NumPy: { Icon: SiNumpy, color: '#013243', dark: '#4DABCF', brand: true },
  PyMuPDF: { Icon: LuFileText, color: '#B08A5B', dark: '#C9A227' },
  Shapely: { Icon: LuShapes, color: '#B08A5B', dark: '#C9A227' },
  rasterio: { Icon: LuMap, color: '#B08A5B', dark: '#C9A227' },

  // Practices
  Microservices: { Icon: LuBoxes, color: '#B08A5B', dark: '#C9A227' },
  'Event-driven design': { Icon: LuZap, color: '#B08A5B', dark: '#C9A227' },
  'JWT/RBAC': { Icon: SiJsonwebtokens, color: '#000000', dark: '#F3EBDD', brand: true },
  Agile: { Icon: LuRefreshCw, color: '#B08A5B', dark: '#C9A227' },
  'Code review': { Icon: LuGitPullRequest, color: '#B08A5B', dark: '#C9A227' },
};

const fallback = { Icon: LuCpu, color: '#B08A5B', dark: '#C9A227' };

/** Look up a tech by name; unknown names get a generic icon. */
export function getTech(name) {
  return icons[name] ?? fallback;
}

/** Inline CSS variables consumed by the `.brand-hover` utility. */
export function brandVars(name) {
  const t = getTech(name);
  return { '--brand': t.color, '--brand-dark': t.dark ?? t.color };
}
