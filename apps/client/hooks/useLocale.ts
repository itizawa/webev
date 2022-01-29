import { useRouter } from 'next/router';
import { en } from '../libs/locales/en';
import { ja } from '../libs/locales/ja';

export const useLocale = (): { locale?: string; t: typeof en } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
