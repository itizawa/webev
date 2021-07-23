import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';

import { Icon } from '~/components/base/atoms/Icon';
import { useLocale } from '~/hooks/useLocale';
import { BootstrapBreakpoints } from '~/interfaces/variables';
import { useSearchKeyWord } from '~/stores/page';

export const SearchForm: VFC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isExpand, setIsExpand] = useState(false);

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
    <StyledForm
      isExpand={isExpand}
      className="input-group input-group-sm"
      onSubmit={onSubmitSearchForm}
      onFocus={() => setIsExpand(true)}
      onBlur={() => setIsExpand(false)}
    >
      <button className="btn btn-secondary text-white" type="submit" id="input-group-search">
        <Icon height={16} width={16} icon="SEARCH" color="WHITE" />
        <span className="ms-2">{t.search}</span>
      </button>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="form-control bg-white" />
    </StyledForm>
  );
};

const StyledForm = styled.form<{ isExpand: boolean }>`
  @media (min-width: ${BootstrapBreakpoints.md}px) {
    ${({ isExpand }) => isExpand && `width: 400px;`}
    transition: all 1000ms;
  }
`;
