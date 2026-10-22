// All content sourced from career-ops/cv.md — edit here to update the site.

export const profile = {
  name: 'Min Yang',
  title: 'Software Engineer',
  location: 'New York, NY',
  email: 'minyang828@gmail.com',
  phone: '(425) 244-0481',
  phoneHref: 'tel:+14252440481',
  linkedin: 'https://linkedin.com/in/minyang828',
  summary:
    'Software Engineer with experience building event-driven, high-scale backend systems and full-stack web applications. Background spans risk/fraud platforms, real-time data pipelines, and customer-facing product work across fintech.',
};

export const experience = [
  { company: 'SoFi', role: 'Software Engineer', dates: 'May 2022 – Jun 2025' },
  { company: 'Better.com', role: 'Software Engineer', dates: 'Jul 2021 – Apr 2022' },
  { company: '2U & Trilogy Education', role: 'CS Tutor', dates: 'Jan 2021 – Jul 2021' },
];

export const education = {
  school: 'University of Washington',
  degree: 'B.S. in Informatics, focus on Software Engineering',
};

export const skills = {
  Languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'Kotlin'],
  'Frameworks & APIs': ['Spring Boot', 'React', 'Node.js', 'GraphQL'],
  Databases: ['PostgreSQL', 'Redis'],
  Technologies: ['Git', 'Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Datadog', 'Jenkins', 'Kafka'],
};

export const hobbies = [
  { icon: '🏀', name: 'Basketball', detail: 'Youth basketball coach' },
  { icon: '🧩', name: 'Sudoku', detail: 'Competitive player' },
  { icon: '🎲', name: 'Catan', detail: 'Player' },
];

export const projects = [
  {
    name: "Risk & Compliance Workflow Platform",
    slug: "risk-compliance-workflows",
    org: "SoFi",
    metric: "10K+",
    metricLabel: "workflows per day across 5 products",
    description:
      "A shared platform for building onboarding and risk flows from reusable steps, including the identity checks required when members open new accounts.",
    stack: ["Temporal", "Kafka", "Kotlin", "Spring Boot", "React", "Kubernetes"],
    problem:
      "Onboarding and risk flows were hard-coded, sequential, and tightly coupled to individual products. Every compliance change meant updating multiple codebases, and each product re-implemented steps like OTP verification and identity checks slightly differently. Identity verification for new accounts, required under the USA PATRIOT Act's Customer Identification Program, was also handled inconsistently from team to team.",
    solution:
      "A shared workflow platform where product teams compose flows from reusable steps that branch on real-time risk decisions. On top of it, a centralized compliance onboarding flow returns ALLOW, DENY, or CHALLENGE for every new account and routes challenged users to document verification or manual review.",
    role: "Led development of the workflow platform and the backend of the compliance onboarding flow.",
    architecture: [
      { label: "Product onboarding + React UI", detail: "Products call one events API; a UI router polls for the next step and renders the matching reusable component" },
      { label: "Controller API", detail: "Creates and queries workflows; forwards user input as workflow signals" },
      { label: "Temporal workflows", detail: "Routing logic only, branching on risk and compliance decisions (ALLOW / DENY / CHALLENGE)" },
      { label: "Spring Boot workers", detail: "Activities such as risk decisions, OTP, and third-party identity verification; scaled horizontally on Kubernetes" },
      { label: "Kafka + workflow history", detail: "Publishes outcomes to products and records every step for audit" },
    ],
    challenges: [
      "Long-running, stateful workflows: users can pause, resume, fail, retry, or be routed into alternate paths. Temporal provided durable state, built-in retries, and replay instead of hand-managed state machines.",
      "Safe retries: workflow definitions hold only routing logic, with every side effect in an activity, and deterministic child workflow IDs prevent duplicate step-ups when Temporal retries.",
      "Auditability as a first-class requirement: every compliance decision had to be reproducible, including which steps ran, their outcomes, which documents were reviewed, and whether an override was applied.",
      "Evolving requirements: compliance rules were still being finalized during the build, so they live in workflows that can change without re-architecting or product redeploys.",
      "Getting buy-in: some engineers saw a workflow engine as over-engineering. I built a Temporal proof of concept of a reusable OTP flow and walked through a cost-of-change comparison: what happens when a compliance rule changes across five products?",
      "Driving adoption: a deliberately simple API, integration docs with worked examples, knowledge-share sessions, and integration milestones planned into each product team's sprints.",
    ],
    impact: [
      "5 products integrated, running 10K+ workflows per day",
      "Integration time for a new flow cut from ~2 months to ~2 weeks",
      "Compliance updates ship as workflow changes, with no product redeploys",
      "Standardized identity-compliance enforcement and reduced manual review volume",
      "−40% false positives",
    ],
    lesson:
      "Architectural disagreements are rarely about technology; they're about risk perception. Working examples and explicit trade-offs move people faster than opinions.",
  },
  {
    name: "Member Risk Platform",
    slug: "member-risk-platform",
    org: "SoFi",
    metric: "+50%",
    metricLabel: "reactive risk detection accuracy",
    description:
      "Gives fraud operators real-time access to member risk profiles so they can act during incidents without waiting on engineering.",
    stack: ["Spring Boot", "PostgreSQL", "React", "Kafka"],
    problem:
      "During fraud incidents, operators and leadership needed real-time access to a member's risk profile: red flags, block lists, login history, account-takeover counts, and past fraud reports. Previously they had to file tickets with the risk engineering team, which made engineering a bottleneck and slowed down help for customers.",
    solution:
      "An editable member risk profile, bulk add/edit/delete of red flags and block lists, and member search by name, email, phone, or last 4 digits of SSN.",
    role: "Designed and built the platform, full stack.",
    architecture: [
      { label: "React operator UI", detail: "Risk profiles, bulk tools, and member search" },
      { label: "Spring Boot services", detail: "APIs for profile edits, bulk updates, and search" },
      { label: "PostgreSQL", detail: "Risk profiles, red flags, and block lists" },
      { label: "Kafka", detail: "Profile changes and transactions trigger real-time risk updates" },
    ],
    challenges: [
      "Bulk updates by ID: rather than highlighting invalid IDs inside a long list that operators had to scroll through, I collected the invalid IDs into the error message with a copy button.",
      "Search for non-engineers: the original design used wildcard search, which suits engineers but not operators. I replaced it with simple \"is / includes / doesn't include\" options.",
    ],
    impact: [
      "+50% reactive risk detection accuracy",
      "Operators manage risk data themselves instead of filing engineering tickets",
    ],
  },
  {
    name: "AML Data Export Pipeline",
    slug: "aml-data-export",
    org: "SoFi",
    description:
      "Delivers daily customer and transaction data to an anti-money-laundering monitoring vendor, reliably and with a full audit trail.",
    stack: ["Kotlin", "Spring Boot", "Kafka", "PostgreSQL", "Kubernetes", "Datadog"],
    problem:
      "SoFi's anti-money-laundering (AML) transaction-monitoring vendor needed customer, account, and transaction data as daily CSV files over SFTP, across all transactional products, with the ability to resend historical data and a full audit record of everything sent.",
    role: "Designed the service.",
    architecture: [
      { label: "Kafka consumers", detail: "Change events enqueue entity IDs" },
      { label: "DB-backed work queue", detail: "Async processing with retries, one queue per entity type" },
      { label: "Source-of-truth APIs", detail: "Fetch canonical customer, account, and transaction data" },
      { label: "PostgreSQL", detail: "Keeps a copy of everything sent" },
      { label: "Scheduled export", detail: "Generates the CSV, stores file metadata, and triggers the SFTP upload" },
    ],
    challenges: [
      "Durability: no data could be lost during outages, so the work queue retries whenever upstream services are down.",
      "Historical replay: Kafka retention is limited, so Kafka only triggers ingestion while canonical data lives in Postgres, with a bulk-ingest API for backfills.",
      "Mid-project pivot: data-warehouse pipelines proved too brittle to depend on, so we sourced data directly from internal product APIs, reducing latency and increasing reliability.",
      "Clean vendor boundary: kept the previous vendor's data transformations out of the new integration.",
      "Observability: Datadog monitoring of consumer lag, queue depth, retries, and export metrics.",
    ],
    impact: [
      "Daily data delivery across all transactional products",
      "Every exported file tracked for regulatory audits",
      "Historical data resent on demand, replacing a manual offline process",
      "Replaced a brittle legacy integration, built to scale with 2–3 years of growth",
    ],
  },
  {
    name: "Identity Verification Integration",
    slug: "identity-verification",
    org: "SoFi",
    metric: "$100M+",
    metricLabel: "saved annually",
    description:
      "Identity checks during sign-up that stop fraudulent accounts before they're opened.",
    stack: ["Spring Boot"],
    problem: "Prevent fraudulent accounts from being opened during member onboarding.",
    role: "Integrated and optimized the third-party services.",
    architecture: [
      { label: "Member onboarding", detail: "New applicant signs up" },
      { label: "Spring Boot services", detail: "Orchestrate verification checks" },
      { label: "Third-party providers", detail: "Risk and identity verification" },
    ],
    challenges: [],
    impact: ["Over $100M saved annually", "Prevented fraudulent onboarding"],
  },
  {
    name: "Unified Lock Task",
    slug: "unified-lock-task",
    org: "Better.com",
    metric: "−30%",
    metricLabel: "lock-related issues",
    description:
      "Combined two confusing mortgage rate-lock steps into one, so borrowers lock their rate with fewer problems.",
    stack: ["React", "TypeScript"],
    problem:
      "Borrowers must lock their rate before underwriting. Better had two separate lock tasks, one requiring an appraisal payment and one that didn't, which caused confusion, duplicate logic, and post-lock churn when loan product requirements were only verified after locking.",
    role: "Designed and implemented the unified lock task, owning it from requirements through testing and maintenance.",
    architecture: [
      { label: "Loan facts", detail: "When the required facts pass, the lock task is triggered automatically" },
      { label: "Unified lock task", detail: "One React task supporting appraisal-required and no-appraisal states" },
      { label: "Rates service", detail: "Validates the selected product before locking" },
      { label: "Error handling", detail: "Prioritized error states shown to the borrower" },
    ],
    challenges: [
      "Error priority: five error states, from \"pricing updated\" up to \"product no match\", ranked so borrowers always see the message that matters most.",
      "Pre-lock validation: verifying product-specific requirements before locking instead of after, to prevent post-lock churn.",
      "Invalid actions: preventing borrowers or employees from locking an already-locked file.",
      "Appraisal waivers: handling waivers dynamically instead of manually sending borrowers alternate tasks.",
    ],
    impact: [
      "Lock tasks consolidated from 2 to 1",
      "−30% lock-related issues and ~9% fewer customer calls",
      "−20% labor cost per lock (~$4 saved in pre-lock labor on every lock)",
      "Test coverage for every scenario, plus better error monitoring",
    ],
  },
  {
    name: "Loan Estimate Disclosure Migration",
    slug: "loan-estimate-migration",
    org: "Better.com",
    metric: "2×",
    metricLabel: "faster page loads",
    description:
      "Rebuilt the annotated Loan Estimate that explains a borrower's loan costs, so it loads twice as fast and saves customers time.",
    stack: ["React", "TypeScript", "Ember.js"],
    problem:
      "The annotated Loan Estimate, an educational tool explaining a borrower's loan terms, payments, and closing costs, was a 400+ line legacy Ember.js implementation that loaded slowly.",
    role: "Migrated it to React and TypeScript.",
    architecture: [
      { label: "Loan Estimate HTML", detail: "Generated by the documents team and rendered in an iframe" },
      { label: "Annotations", detail: "Filtered by loan facts such as purchase vs. refinance and escrow" },
      { label: "Anchoring", detail: "Each annotation is matched to its document section" },
      { label: "Responsive UI", detail: "Sidebar on desktop, modal on mobile" },
    ],
    challenges: [
      "Overlapping annotations: I wrote a repositioning algorithm that calculates overlap and redistributes spacing, with smooth animation as the active annotation changes.",
      "Linked highlighting: hovering a document section, its number, or its sidebar annotation highlights all three.",
      "Performance: throttled resize handling, and the document scales to every screen size.",
      "Reliability: unit tests for the repositioning logic.",
    ],
    impact: ["2× faster page loads", "~10 minutes saved per customer session on average"],
  },
  {
    name: "Loan Estimate Walkthrough",
    org: "Better.com",
    metric: "−5%",
    metricLabel: "support costs",
    description:
      "Led a guided walkthrough that helps borrowers understand their loan estimate, from requirements to production.",
    stack: ["React", "TypeScript"],
  },
  {
    name: "Product Selection Caching",
    org: "Better.com",
    metric: "−70%",
    metricLabel: "latency",
    description: "Made the loan product selection step faster with caching.",
    stack: ["Redis"],
  },
];

export const capstone = {
  name: 'ShareSpace',
  label: 'University of Washington · Capstone Project',
  description:
    'A housing platform that connects domestic violence survivors with safe short-term stays from community hosts, coordinated through local nonprofit advocates.',
  role: 'Full Stack Developer',
  stack: ['React', 'Firebase', 'Material UI'],
  award: 'Service Award',
  awardDetail: 'Won out of 130+ capstone teams',
  url: 'https://my828.github.io/sharespace/',
  slug: 'sharespace',
  org: 'University of Washington',
  problem:
    'Emergency shelter and transitional housing are among the most urgent unmet needs for domestic violence survivors. ShareSpace helps local nonprofits coordinate housing resources so survivors have somewhere safe to stay.',
  architecture: [
    { label: 'React app', detail: 'Survivor, host, and advocate views (Material UI)' },
    { label: 'Firebase Auth', detail: 'Sign-up, login, password reset' },
    { label: 'Firebase database', detail: 'Listings, availability, bookings' },
    { label: 'Algolia Places', detail: 'Address search for listings' },
  ],
  challenges: [
    'Choosing the right problem: the team was split between financial support and housing. Police officers and advocates who work with survivors every day told us an immediate safe place to stay mattered most, so we built for housing.',
    'Late user feedback: in testing a month before capstone night, a host pointed out a missing calendar for seeing and changing which listings were available or booked. With about a week left, I combined two React calendar libraries, one to display bookings and one for drag-to-toggle availability, and adjusted the design with the team.',
  ],
  impact: ['Service Award, won out of 130+ capstone teams'],
};
