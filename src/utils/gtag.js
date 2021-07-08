/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line no-undef
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const pageview = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({ action, category, label }) => {
  if (GA_ID === '') {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  });
};
