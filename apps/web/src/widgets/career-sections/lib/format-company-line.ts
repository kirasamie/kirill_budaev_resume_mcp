export const formatCompanyLine = (company: string, location?: string) =>
  location ? `${company} · ${location}` : company;
