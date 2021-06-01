import { useEffect, useState, VFC } from 'react';
import { Icon } from '../Icons/Icon';
import { useLocale } from '~/hooks/useLocale';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { useSearchKeyWord } from '~/stores/page';

export const SearchForm: VFC = () => {
  const [inputValue, setInputValue] = useState('');

  const { t } = useLocale();
  const { data: searchKeyWord, mutate: mutateSearchKeyord } = useSearchKeyWord();

  useEffect(() => {
    if (searchKeyWord != null) {
      setInputValue(searchKeyWord);
    }
  }, [searchKeyWord]);

  const onSubmitSearchForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    mutateSearchKeyord(inputValue);
  };

  return (
    <form className="input-group input-group-sm" onSubmit={onSubmitSearchForm}>
      <button className="btn btn-secondary text-white" type="submit" id="input-group-search">
        <Icon height={16} width={16} icon={BootstrapIcon.SEARCH} color={BootstrapColor.WHITE} />
        <span className="ms-2">{t.search}</span>
      </button>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="form-control bg-white" />
    </form>
  );
};
