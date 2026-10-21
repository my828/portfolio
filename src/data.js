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
  Databases: ['PostgreSQL', 'CockroachDB', 'Elasticsearch', 'Redis'],
  Technologies: ['Git', 'Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Datadog', 'Jenkins', 'Kafka'],
};

export const projects = [
  {
    name: 'Member Risk Platform',
    org: 'SoFi',
    metric: '+50%',
    metricLabel: 'reactive risk detection accuracy',
    description:
      'Designed and built a platform to detect and manage high-risk users, with an event-driven architecture triggered by customer profile changes and transactions to compute real-time risk scores.',
    stack: ['Kafka', 'Python', 'Microservices'],
  },
  {
    name: 'Temporal Business Workflows',
    org: 'SoFi',
    metric: '−40%',
    metricLabel: 'false positives',
    description:
      'Implemented complex business workflows with Temporal.io, improving system reliability and data consistency.',
    stack: ['Temporal.io', 'Kotlin', 'Spring Boot'],
  },
  {
    name: 'Identity Verification Integration',
    org: 'SoFi',
    metric: '$100M+',
    metricLabel: 'saved annually',
    description:
      'Integrated and optimized third-party risk and identity verification services to prevent fraudulent onboarding.',
    stack: ['Spring Boot', 'Kubernetes'],
  },
  {
    name: 'Unified Lock Task System',
    org: 'Better.com',
    metric: '−30%',
    metricLabel: 'lock-related issues',
    description:
      'Designed and implemented a unified lock task system, also lowering labor costs by 20% per lock.',
    stack: ['React', 'TypeScript'],
  },
  {
    name: 'Product Selection Caching',
    org: 'Better.com',
    metric: '−70%',
    metricLabel: 'latency',
    description: 'Delivered a Redis-based caching solution for the product selection flow.',
    stack: ['Redis'],
  },
  {
    name: 'Disclosure Docs Migration',
    org: 'Better.com',
    metric: '2×',
    metricLabel: 'faster page loads',
    description:
      'Migrated disclosure documents from Ember.js to React, saving customers an average of 10 minutes per session.',
    stack: ['React', 'Ember.js'],
  },
];

export const capstone = {
  name: 'ShareSpace',
  label: 'University of Washington · Capstone Project',
  description:
    'A housing platform that connects domestic violence survivors with short-term stays from community hosts, coordinated through local nonprofit advocates. Includes an advocate dashboard with a real-time calendar of host availability and bookings.',
  role: 'Full Stack Developer',
  stack: ['React', 'Firebase', 'Material UI'],
  award: 'Service Award',
  awardDetail: 'Won out of 150+ projects',
  url: 'https://my828.github.io/sharespace/',
};
