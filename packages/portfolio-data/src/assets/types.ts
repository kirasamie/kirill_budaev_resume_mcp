import type certificationsJson from './certifications.json';
import type contactJson from './contact.json';
import type educationJson from './education.json';
import type experienceJson from './experience.json';
import type profileJson from './profile.json';
import type projectsJson from './projects.json';
import type skillsJson from './skills.json';

export type ProfileRaw = typeof profileJson;
export type ContactRaw = typeof contactJson;
export type ExperienceRaw = (typeof experienceJson)[number];
export type ExperienceListRaw = typeof experienceJson;
export type ProjectRaw = (typeof projectsJson)[number];
export type ProjectsRaw = typeof projectsJson;
export type SkillRaw = (typeof skillsJson)[number];
export type SkillsRaw = typeof skillsJson;
export type EducationRaw = (typeof educationJson)[number];
export type EducationListRaw = typeof educationJson;
export type CertificationRaw = (typeof certificationsJson)[number];
export type CertificationsRaw = typeof certificationsJson;

export interface PortfolioAssetsRaw {
  profile: ProfileRaw;
  contact: ContactRaw;
  experience: ExperienceListRaw;
  projects: ProjectsRaw;
  skills: SkillsRaw;
  education: EducationListRaw;
  certifications: CertificationsRaw;
}
