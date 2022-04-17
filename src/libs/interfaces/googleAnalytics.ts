type ContactEvent = {
  action: 'submit_form';
  category: 'contact';
  label: string;
};

type ClickEvent = {
  action: 'click';
  category: 'other';
  label: string;
};

export type Event = ContactEvent | ClickEvent;
