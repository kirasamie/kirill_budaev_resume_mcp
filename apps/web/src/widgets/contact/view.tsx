import { Container, Section } from '@shared/ui';

import type { ContactBlockProps } from './types';

export const ContactBlock = ({ contact }: ContactBlockProps) => {
  const telegramHandle = contact.telegram.replace('https://t.me/', '@');

  return (
    <Container>
      <Section id="contact" title="Контакты">
        <ul className="space-y-3 text-slate-300">
          <li>
            <span className="text-slate-500">Email: </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-sky-300 transition hover:text-sky-200"
            >
              {contact.email}
            </a>
          </li>
          <li>
            <span className="text-slate-500">Telegram: </span>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="text-sky-300 transition hover:text-sky-200"
            >
              {telegramHandle}
            </a>
          </li>
        </ul>
      </Section>
    </Container>
  );
};
