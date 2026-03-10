'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  period: string
  category: string
  color: string
  story: string
  highlights: string[]
  tech: string[]
  links?: { label: string; href: string; icon: 'github' | 'external' }[]
}

const projects: Project[] = [
  {
    title: 'Emergency Social Network',
    subtitle: 'Real-time Crisis Communication Platform',
    period: 'Nov 2025 – Present',
    category: 'Full-Stack · CMU Course Project',
    color: '#e76f51',
    story: `What does it mean to build a system that people rely on in an emergency?

That question shaped every architectural decision in ESN. This isn't a messaging app for casual use — it's designed for disaster scenarios where connectivity is unstable, messages can't be lost, and hundreds of people need to communicate simultaneously.

I engineered the real-time messaging layer using Node.js and Socket.io to handle 1,000+ concurrent connections. The hardest part wasn't the happy path — it was the edge cases. When a user's connection drops mid-crisis, what happens? I built automatic reconnection logic and message queue buffering, so no message gets silently swallowed by a network partition. The UI updates optimistically so users aren't left staring at a spinner wondering if their message sent.

Full-text search was another deep problem: when you're searching for "evacuation" across thousands of announcements, you need sub-100ms response. I achieved P95 latency under 100ms through MongoDB indexing strategy and cursor-based pagination — the system stays fast even as data grows.

CI/CD keeps quality consistent: GitHub Actions runs ESLint checks, Jest test suites, and Docker deployments automatically. I also built a load testing framework that caught a connection pool exhaustion bug before it could cause failures in production. 2-week Agile sprints kept the team aligned throughout.`,
    highlights: [
      '1,000+ concurrent connections via Socket.io with auto-reconnect',
      'Sub-100ms P95 search latency via MongoDB indexing + cursor pagination',
      'CI/CD pipeline: GitHub Actions → ESLint → Jest → Docker',
      'Load testing caught connection pool exhaustion before production',
    ],
    tech: ['Node.js', 'Socket.io', 'MongoDB', 'Docker', 'GitHub Actions', 'Jest', 'React'],
  },
  {
    title: 'Expense Management Platform',
    subtitle: 'Serverless Full-Stack Expense Tracker',
    period: 'Jun 2025 – Aug 2025',
    category: 'Full-Stack · AWS',
    color: '#5bb8dc',
    story: `The challenge with expense tracking isn't the UI — it's the plumbing. Multiple users updating the same data, AI categorizing expenses in the background, everything synchronized in real time without the user ever thinking about latency.

I built this on Next.js and React with a serverless AWS backend, using Convex for real-time multi-user data synchronization. When two people update the same expense record simultaneously, the state stays consistent — no conflicts, no stale data.

The AI integration was where things got interesting. Gemini AI handles auto-categorization — you paste an expense, and within moments it's tagged and filed. The naïve approach would be to make the AI call synchronously and block the response. Instead, I processed it asynchronously through Kafka, which reduced P95 request latency by 60%. The user experience is instant; the AI does its work in the background.

AWS Secrets Manager handles credential management, and CloudWatch provides visibility into system health. When you're building on serverless infrastructure, observability isn't optional — you need to know exactly what's happening even without persistent servers to log to.`,
    highlights: [
      'Real-time multi-user sync via Convex for data consistency',
      '60% P95 latency reduction via async Kafka processing',
      'Gemini AI expense auto-categorization in background',
      'AWS Secrets Manager + CloudWatch for security & monitoring',
    ],
    tech: ['Next.js', 'React', 'AWS Lambda', 'Kafka', 'Convex', 'Gemini AI', 'CloudWatch'],
  },
  {
    title: 'Recipe Recommendation Engine',
    subtitle: 'Search Platform with Smart Auth',
    period: 'Mar 2024 – May 2024',
    category: 'Full-Stack · BU Course Project',
    color: '#2a9d8f',
    story: `Search is deceptively hard to get right. Most search implementations feel slow, imprecise, or both. For this recipe platform, I wanted search that felt instant — and results that were actually relevant.

I implemented an inverted index data structure for recipe search, achieving sub-50ms query latency consistently. When you type "pasta carbonara," the system doesn't scan every recipe — it looks up the index and returns ranked results immediately.

The auth system uses bcrypt for password hashing and secure session management. External recipe data comes from the Edamam API, and integrating a third-party API reliably means handling its failure modes: rate limits hit without warning, servers time out unexpectedly. I implemented exponential backoff retry logic and local caching so the user experience stays smooth even when the upstream API doesn't.`,
    highlights: [
      'Sub-50ms query latency via inverted index search',
      'bcrypt auth + secure session management',
      'Edamam API integration with exponential backoff retry',
      'Local caching to gracefully handle rate limits',
    ],
    tech: ['React', 'Flask', 'MySQL', 'Python', 'Edamam API', 'bcrypt'],
  },
  {
    title: 'Heart Disease Risk Predictor',
    subtitle: 'ML-Powered Health Risk Calculator',
    period: 'Mar 2023 – May 2023',
    category: 'Machine Learning · Data Science',
    color: '#e63946',
    story: `Heart disease kills more people globally than any other condition. The CDC has a massive survey dataset tracking lifestyle factors and health outcomes. The question I set out to answer: what factors actually matter?

Starting with the raw CDC dataset in R, I explored correlations between lifestyle variables — BMI, activity level, smoking, diet — and heart disease outcomes. ANOVA testing confirmed which factors were statistically significant versus noise.

I built and tuned a Random Forest classification model in Python, then applied LASSO regression for feature selection. The regularization helped cut through correlated predictors and identify the critical few: BMI, physical activity, and weight were the dominant drivers.

The final deliverable was an interactive heart disease risk calculator. Inputting a user's health metrics generates a personalized risk score. Through feature selection and cross-validation tuning, I improved prediction accuracy meaningfully — and the data-driven recommendations showed a 4% improvement in health plan success rates.`,
    highlights: [
      'Random Forest + LASSO regression for feature selection',
      'Identified BMI, activity, weight as critical risk predictors',
      'Interactive risk calculator with personalized health scoring',
      '4% improvement in health plan success rates from recommendations',
    ],
    tech: ['Python', 'R', 'scikit-learn', 'Random Forest', 'LASSO', 'ggplot2'],
  },
  {
    title: 'Income Determinants Analysis',
    subtitle: 'ML Prediction on NLSY97 Dataset',
    period: 'Sep 2022 – Dec 2022',
    category: 'Machine Learning · Statistical Analysis',
    color: '#7b2d8b',
    story: `What determines how much someone earns? This is one of the most studied questions in economics — and one of the hardest to model well.

Using the National Longitudinal Survey of Youth 97 dataset, I built a comprehensive analysis pipeline: data cleaning, feature engineering, and systematic model evaluation across 10+ architectures. The dataset required careful handling — longitudinal data with missing values, categorical variables, and significant class imbalance.

Among all models tested — linear regression, decision trees, Random Forest, Neural Networks — the ensemble methods consistently outperformed simpler approaches. The final Neural Network model achieved 78% prediction accuracy, identifying education, occupation type, and geographic region as the most influential income predictors.`,
    highlights: [
      '78% prediction accuracy across 10+ model architectures',
      'Full pipeline: cleaning → feature engineering → model evaluation',
      'Random Forest + Neural Network as top performers',
      'Education, occupation, geography as top income predictors',
    ],
    tech: ['Python', 'scikit-learn', 'Neural Networks', 'Random Forest', 'pandas', 'matplotlib'],
  },
  {
    title: 'Computer Vision Age Predictor',
    subtitle: 'CNN Regression on Facial Images',
    period: 'Jun 2023 – Sep 2024',
    category: 'Deep Learning · Computer Vision',
    color: '#f4a261',
    story: `Age prediction from facial images is a classic computer vision benchmark — and a genuinely difficult one. Faces age non-linearly, lighting and expression introduce noise, and the dataset distribution matters enormously.

I built a CNN regression model trained on the UTKFace dataset, which contains tens of thousands of labeled facial images across a wide age range. The preprocessing pipeline included normalization, augmentation, and careful handling of demographic diversity in the training data to improve model robustness.

After systematic hyperparameter tuning and architecture iteration, the final model achieved a Mean Absolute Error of 5.8 years — meaning on average, the model's age prediction is within 6 years of the actual age. On a task where human judgment averages similar error rates, that's a meaningful result.`,
    highlights: [
      'CNN regression on UTKFace dataset for age prediction',
      'Achieved MAE of 5.8 years after systematic tuning',
      'Preprocessing pipeline for demographic robustness',
      'Augmentation techniques to improve generalization',
    ],
    tech: ['Python', 'PyTorch', 'CNN', 'Computer Vision', 'UTKFace', 'NumPy'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`glass-card overflow-hidden transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        borderTop: `3px solid ${project.color}`,
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-4">
          <div>
            <div
              className="text-xs mb-1"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
            >
              {project.period} · {project.category}
            </div>
            <h3 className="text-lg font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm" style={{ color: project.color }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Story preview / full */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
        >
          {expanded ? project.story : project.story.slice(0, 220) + '...'}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs mb-4 transition-colors hover:opacity-80"
          style={{ color: project.color, fontFamily: 'var(--font-mono)' }}
        >
          {expanded ? '← Read less' : 'Read full story →'}
        </button>

        {/* Highlights */}
        {expanded && (
          <div className="grid grid-cols-1 gap-1.5 mb-4">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs p-2 rounded"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
              >
                <span style={{ color: project.color }}>▸</span>
                {h}
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}25`,
                color: project.color,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="projects"
      className="relative py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                letterSpacing: '0.1em',
              }}
            >
              03 · ENGINEERING DEPTH
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Projects
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Each project was a puzzle worth solving. Here's what I built — and why it mattered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
