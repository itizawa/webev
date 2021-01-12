import { ComponentProps, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { InputForm } from '~src/components/molecules/InputForm';

export default {
  title: 'molecules/InputForm',
  component: InputForm,
};

export const _default: Story<ComponentProps<typeof InputForm>> = () => {
  const [url, setUrl] = useState('');

  return (
    <>
      <h4>Input Form</h4>
      <div className="w-50">
        <InputForm inputValue={url} onChangeInputValue={setUrl} onClickSaveBtn={() => setUrl('')} />
      </div>
    </>
  );
};
