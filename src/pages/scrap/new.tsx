import { VFC } from 'react';

import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { IconButton } from '~/components/Icons/IconButton';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | New ${t.create_scrap}`} />
      <LoginRequiredWrapper>
        <div className="row pt-4">
          <div className="col-12 offset-md-2 col-md-8">
            <h1>{t.create_scrap}</h1>
            <div className="mb-3">
              <label htmlFor="scrap-title" className="form-label">
                {t.title}
              </label>
              <input type="text" className="form-control bg-white" id="scrap-title" placeholder={t.scrap_title_placeholder} />
            </div>
            <div className="mb-3">
              <label htmlFor="scrap-body" className="form-label">
                {t.description}
              </label>
              <textarea className="form-control bg-white" id="scrap-body" placeholder={t.scrap_description_placeholder} rows={3} />
            </div>
            <h2>Page</h2>
            <StyledDiv className="text-center mt-3">
              <IconButton
                icon={BootstrapIcon.PLUS_DOTTED}
                color={BootstrapColor.LIGHT}
                activeColor={BootstrapColor.LIGHT}
                // onClickButton={() => setIsCreatingNewDirectory(true)}
              />
            </StyledDiv>
          </div>
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;

const StyledDiv = styled.div`
  > .btn {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    :hover {
      background-color: rgba(200, 200, 200, 0.2);
      transition: all 300ms linear;
    }
  }
`;
