import { describe, expect, it } from '@jest/globals';
import { resumeRaw } from '@portfolio/data/resume';

import { ResumePortfolioSchema } from './model';

describe('ResumePortfolioSchema', () => {
  it('Если передан resumeRaw из data, то схема успешно парсит портфолио', () => {
    const result = ResumePortfolioSchema.parse(resumeRaw);

    expect(result.profile.name).toBe(resumeRaw.profile.name);
    expect(result.contact).toEqual(resumeRaw.contact);
    expect(result.experience).toHaveLength(resumeRaw.experience.length);
    expect(result.projects).toHaveLength(resumeRaw.projects.length);
    expect(result.skills).toHaveLength(resumeRaw.skills.length);
    expect(result.education).toHaveLength(resumeRaw.education.length);
    expect(result.certifications).toHaveLength(resumeRaw.certifications.length);
  });

  it('Если contact содержит только публичные поля, то phone сохраняется', () => {
    const result = ResumePortfolioSchema.parse(resumeRaw);

    expect(result.contact.phone).toBe(resumeRaw.contact.phone);
    expect(result.contact).not.toHaveProperty('preferredContact');
    expect(result.contact).not.toHaveProperty('messengers');
  });

  it('Если email в contact невалиден, то схема выбрасывает ошибку', () => {
    expect(() =>
      ResumePortfolioSchema.parse({
        ...resumeRaw,
        contact: {
          ...resumeRaw.contact,
          email: 'not-an-email',
        },
      }),
    ).toThrow();
  });
});
