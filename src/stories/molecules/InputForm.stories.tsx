import { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { InputForm } from '~/components/molecules/InputForm';

export default {
  title: 'molecules/InputForm',
  component: InputForm,
};

export const _default: Story<ComponentProps<typeof InputForm>> = () => {
  return (
    <>
      <h4>Input Form</h4>
      <div className="w-50">
        <InputForm onSubmitForm={(inputValue) => console.log(inputValue)} />
      </div>
    </>
  );
};
