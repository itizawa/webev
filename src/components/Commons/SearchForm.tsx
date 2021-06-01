import { useState, VFC } from 'react';
import { useLocale } from '~/hooks/useLocale';

export const SearchForm: VFC = () => {
  const [inputValue, setInputValue] = useState('');

  const { t } = useLocale();

  const onSubmitSearchForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log('hoge');
  };

  return (
    <form className="input-group input-group-sm" onSubmit={onSubmitSearchForm}>
      <button className="btn btn-secondary" type="submit" id="input-group" disabled={inputValue.length === 0}>
        {t.search}
      </button>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="form-control ps-3 bg-white" />
    </form>
  );
};
