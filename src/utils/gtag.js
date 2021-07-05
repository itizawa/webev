// eslint-disable-next-line no-undef
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const pageview = (path) => {
  if (window != null) {
    window.gtag('config', GA_ID, {
      page_path: path,
    });
  }
};

export const event = ({ action, category, label }) => {
  if (GA_ID === '') {
    return;
  }
  if (window != null) {
    window.gtag('event', action, {
      event_category: category,
      event_label: JSON.stringify(label),
    });
  }
};
