import { useRouter } from 'next/router';

const ja = {
  draft: '下書き',
  public: '公開中',
};

const en = {
  draft: 'draft',
  public: 'public',
};

export const useLocale = (): { locale?: string; t: typeof ja } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
