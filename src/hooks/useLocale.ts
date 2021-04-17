import { useRouter } from 'next/router';
import { en } from '~/locales/en';
import { ja } from '~/locales/ja';

export const useLocale = (): { locale?: string; t: typeof en } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
