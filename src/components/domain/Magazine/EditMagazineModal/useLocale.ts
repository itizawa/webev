import { useRouter } from 'next/router';

const ja = {
  create: '作成',
  create_magazine: 'マガジンの作成',
  description: '説明',
  description_desc: '静岡の観光名所をまとめました',
  edit: 'マガジン',
  edit_magazine: 'マガジンの編集',
  name: '名前',
  name_desc: '旅の準備',
  update: '更新',
};

const en = {
  create: 'create',
  create_magazine: 'create magazine',
  description: 'description',
  description_desc: 'I summarized the tourist spots in New York',
  edit: 'edit',
  edit_magazine: 'edit magazine',
  name: 'name',
  name_desc: 'Preparing for the trip',
  update: 'update',
};

export const useLocale = (): { locale?: string; t: typeof ja } => {
  const { locale } = useRouter();

  const t = locale === 'ja' ? ja : en;

  return { locale, t };
};
