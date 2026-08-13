import { Container, Section } from '@shared/ui';

import type { ContactBlockProps } from './types';

export const ContactBlock = ({ contact }: ContactBlockProps) => {
  const telegramHandle = contact.telegram.replace('https://t.me/', '@');

  return (
    <Container>
      <Section id="contact" title="Контакты">
        <ul className="space-y-3 text-content-base-secondary">
          <li>
            <span className="text-content-base-tertiary">Email: </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-content-accent-default transition hover:text-content-accent-hover"
            >
              {contact.email}
            </a>
          </li>
          <li>
            <span className="text-content-base-tertiary">Telegram: </span>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="text-content-accent-default transition hover:text-content-accent-hover"
            >
              {telegramHandle}
            </a>
          </li>
        </ul>
      </Section>
    </Container>
  );
};
