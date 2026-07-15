import type { Portfolio } from '../load-portfolio';
import type { Project } from '../schemas';

const createPortfolioFixture = (projects: Project[]): Portfolio => ({
  profile: {
    name: 'Test',
    title: 'Test',
    summary: 'Test',
    location: { city: 'Moscow', country: 'Russia' },
    workFormat: ['remote'],
    relocation: false,
    experienceYears: 1,
    languages: [{ name: 'Русский', level: 'native' }],
    availability: 'open',
  },
  contact: {
    email: 'test@test.com',
    phone: '+70000000000',
    telegram: 'https://t.me/test',
    preferredContact: 'email',
  },
  experience: [],
  projects,
  skills: [],
  education: [],
  certifications: [],
  resumeMarkdown: '',
});

export { createPortfolioFixture };
