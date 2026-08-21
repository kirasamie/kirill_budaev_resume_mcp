import { copyToClipboard } from './model';

import type { CopyMcpConfigButtonProps } from './types';

const buttonLabel = 'copy';

export const CopyMcpConfigButton = ({ config }: CopyMcpConfigButtonProps) => {
  const handleCopy = () => copyToClipboard(config);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-border-base-main bg-main px-3 py-1.5 font-mono text-sm text-content-base-secondary transition hover:border-content-accent-default hover:text-content-accent-hover"
    >
      {buttonLabel}
    </button>
  );
};
