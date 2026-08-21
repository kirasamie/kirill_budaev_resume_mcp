import { describe, expect, it } from '@jest/globals';

import { resumeRaw } from './model';

describe('resumeRaw', () => {
  it('Если resumeRaw собран, то содержит все секции резюме', () => {
    expect(resumeRaw).toEqual(
      expect.objectContaining({
        profile: expect.any(Object),
        contact: expect.any(Object),
        experience: expect.any(Array),
        projects: expect.any(Array),
        skills: expect.any(Array),
        education: expect.any(Array),
        certifications: expect.any(Array),
      }),
    );
  });

  it('Если resumeRaw собран, то contact включает phone и не включает приватные поля', () => {
    expect(resumeRaw.contact).toEqual({
      email: expect.any(String),
      phone: expect.any(String),
      telegram: expect.any(String),
    });
    expect(resumeRaw.contact).not.toHaveProperty('preferredContact');
    expect(resumeRaw.contact).not.toHaveProperty('messengers');
  });

  it('Если resumeRaw собран, то секции опыта и проектов непустые', () => {
    expect(resumeRaw.experience.length).toBeGreaterThan(0);
    expect(resumeRaw.projects.length).toBeGreaterThan(0);
  });
});
