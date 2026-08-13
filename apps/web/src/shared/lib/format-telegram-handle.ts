export const formatTelegramHandle = (
  telegramUrl: string,
  urlPrefix: string,
  handlePrefix: string,
) => telegramUrl.replace(urlPrefix, handlePrefix);
