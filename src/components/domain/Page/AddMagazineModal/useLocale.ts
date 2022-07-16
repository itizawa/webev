import { useRouter } from 'next/router';

const ja = {
  add_magazine: 'マガジンへ追加',
  update: '更新',
};

const en = {
  add_magazine: 'Add Magazine',
  update: 'Update',
};

export const useLocale = (): { locale?: string; t: typeof ja } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
