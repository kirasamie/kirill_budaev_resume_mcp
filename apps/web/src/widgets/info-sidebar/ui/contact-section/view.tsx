import {
  formatTelegramHandle,
  TELEGRAM_HANDLE_PREFIX,
  TELEGRAM_URL_PREFIX,
  WHITESPACE_REG_EXP,
} from '@shared/lib';
import { ConsoleSection, ExternalLink, KeyValue } from '@shared/ui';

import type { ContactSectionProps } from './types';

const emailLabel = 'почта';
const phoneLabel = 'телефон';
const telegramLabel = 'telegram';

export const ContactSection = ({ contact }: ContactSectionProps) => {
  const mailtoHref = `mailto:${contact.email}`;
  const telHref = `tel:${contact.phone.replace(WHITESPACE_REG_EXP, '')}`;
  const telegramHandle = formatTelegramHandle(
    contact.telegram,
    TELEGRAM_URL_PREFIX,
    TELEGRAM_HANDLE_PREFIX,
  );

  return (
    <ConsoleSection id="contact" title="контакты" className="py-0">
      <div className="space-y-3">
        <KeyValue label={emailLabel}>
          <a
            href={mailtoHref}
            className="text-content-accent-default transition hover:text-content-accent-hover"
          >
            {contact.email}
          </a>
        </KeyValue>
        <KeyValue label={phoneLabel}>
          <a
            href={telHref}
            className="text-content-accent-default transition hover:text-content-accent-hover"
          >
            {contact.phone}
          </a>
        </KeyValue>
        <KeyValue label={telegramLabel}>
          <ExternalLink href={contact.telegram}>{telegramHandle}</ExternalLink>
        </KeyValue>
      </div>
    </ConsoleSection>
  );
};
