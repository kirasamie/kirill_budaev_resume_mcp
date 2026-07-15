import { copyToClipboard } from './model';

import type { CopyMcpConfigButtonProps } from './types';

export const CopyMcpConfigButton = ({ config }: CopyMcpConfigButtonProps) => {
  const handleCopy = () => copyToClipboard(config);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500 hover:text-sky-300"
    >
      Скопировать конфиг
    </button>
  );
};
