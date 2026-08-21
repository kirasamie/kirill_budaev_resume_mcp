const presentLabel = 'н.в.';

export const formatExperiencePeriod = (
  startDate: string,
  endDate: string | null,
) => {
  if (!endDate) {
    return `${startDate} — ${presentLabel}`;
  }

  return `${startDate} — ${endDate}`;
};
