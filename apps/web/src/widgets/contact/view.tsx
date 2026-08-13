import { ConsoleSection, Container, KeyValue } from '@shared/ui';

import type { ContactBlockProps } from './types';

const emailLabel = 'email';
const telegramLabel = 'telegram';
const telegramPrefix = 'https://t.me/';
const telegramAt = '@';

export const ContactBlock = ({ contact }: ContactBlockProps) => {
  const telegramHandle = contact.telegram.replace(telegramPrefix, telegramAt);
  const mailtoHref = `mailto:${contact.email}`;

  return (
    <Container>
      <ConsoleSection id="contact" title="contact">
        <div className="space-y-3">
          <KeyValue label={emailLabel}>
            <a
              href={mailtoHref}
              className="text-content-accent-default transition hover:text-content-accent-hover"
            >
              {contact.email}
            </a>
          </KeyValue>
          <KeyValue label={telegramLabel}>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="text-content-accent-default transition hover:text-content-accent-hover"
            >
              {telegramHandle}
            </a>
          </KeyValue>
        </div>
      </ConsoleSection>
    </Container>
  );
};
