import { ContactBlock } from '@widgets/contact';
import { Hero } from '@widgets/hero';
import { McpConnect } from '@widgets/mcp-connect';
import { getPortfolio } from '@shared/lib';

export const HomePage = () => {
  const { profile, contact } = getPortfolio();

  return (
    <>
      <Hero profile={profile} />
      <McpConnect />
      <ContactBlock contact={contact} />
    </>
  );
};
