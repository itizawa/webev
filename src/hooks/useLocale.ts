import { useRouter } from 'next/router';
import { en } from '~/locales/en';
import { ja } from '~/locales/ja';

export const useLocale = (): { locale?: string; t: { [key: string]: string } } => {
  const { locale } = useRouter();

  const t = locale === 'en' ? en : ja;

  return { locale, t };
};
