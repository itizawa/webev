import { useMemo, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { TOP_URL } from '~/libs/constants/urls';

import { useLocale } from '~/hooks/useLocale';
import { InquiryType } from '~/domains/Inquiry';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();
  const router = useRouter();

  const [inquiryType, setInquiryType] = useState<InquiryType>();
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryText, setInquiryText] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await restClient.apiPost('/inquiries', { type: inquiryType, email: inquiryEmail, text: inquiryText });
      toastSuccess(t.toastr_success_send_inquiry);
      router.push(TOP_URL);
    } catch (err) {
      if (err instanceof Error) if (err instanceof Error) toastError(err);
    }
  };

  const invalidForm = useMemo(() => {
    return inquiryType == null || inquiryEmail.trim() === '' || inquiryText.trim() === '';
  }, [inquiryType, inquiryEmail, inquiryText]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.inquiry}`} />
      <h1 className="text-center">{t.inquiry}</h1>
      <StyledDiv className="mx-auto">
        <form className="mt-3 mt-lg-5" onSubmit={onSubmit}>
          <div className="mb-3 mb-lg-4">
            <label className="col-form-label">{t.inquiry_type}</label>
            <div>
              <select className="form-select" defaultValue="default" onChange={(e) => setInquiryType(e.target.value as InquiryType)}>
                <option value="default">{t.open_select}</option>
                {Object.values(InquiryType).map((v) => {
                  return (
                    <option key={v} value={v}>
                      {t[v]}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-3 mb-lg-4">
            <label htmlFor="inputEmail" placeholder="hoge@example.com" className="col-form-label">
              {t.inquiry_email}
            </label>
            <div>
              <input
                type="email"
                value={inquiryEmail}
                className="form-control"
                id="inputEmail"
                onChange={(e) => setInquiryEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 mb-lg-4">
            <label htmlFor="inputText" placeholder="hoge@example.com" className="col-form-label">
              {t.inquiry_text}
            </label>
            <div>
              <textarea
                rows={5}
                value={inquiryText}
                className="form-control"
                id="inputText"
                onChange={(e) => setInquiryText(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-purple w-100" disabled={invalidForm}>
            {t.inquiry_submit}
          </button>
        </form>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 600px;
`;

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
