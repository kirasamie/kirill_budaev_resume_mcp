import { copyToClipboard } from './model';

import type { CopyMcpConfigButtonProps } from './types';

export const CopyMcpConfigButton = ({ config }: CopyMcpConfigButtonProps) => {
  const handleCopy = () => copyToClipboard(config);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-border-base-main bg-surface px-4 py-2 text-sm font-medium text-content-base-primary transition hover:border-content-accent-default hover:text-content-accent-hover"
    >
      Скопировать конфиг
    </button>
  );
};
