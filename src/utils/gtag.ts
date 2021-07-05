export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const pageview = (path: string): void => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

import { Event } from '~/interfaces/googleAnalytics';

export const event = ({ action, category, label }: Event): void => {
  if (GA_ID === '') {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  });
};
