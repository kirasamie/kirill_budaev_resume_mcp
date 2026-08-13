export const formatDegreeLine = (degree: string, field?: string) =>
  field ? `${degree} · ${field}` : degree;

export const formatEducationMetaLine = (year: number, city?: string) =>
  city ? `${city} · ${year}` : String(year);
