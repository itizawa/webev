import { useRouter } from 'next/router';

const ja = {
  add_magazine: 'マガジンへ追加',
  copy_url: 'URLをコピー',
  delete: '削除',
  share: '共有',
  toastr_success_copy_url: 'Url をコピーしました!',
};

const en = {
  add_magazine: 'Add Magazine',
  copy_url: 'Copy URL',
  delete: 'Delete',
  share: 'Share',
  toastr_success_copy_url: 'Copy Url!',
};

export const useLocale = (): { locale?: string; t: typeof ja } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
