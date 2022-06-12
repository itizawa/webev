import { FC, useCallback } from 'react';

import { format } from 'date-fns';

import { Card, Grid } from '@nextui-org/react';
import { PageManageDropdown } from '../PageManageDropdown';
import { FixedImage } from '~/components/base/atoms/FixedImage';

import { Page } from '~/domains/Page';

import { Text } from '~/components/uiParts';
import { restClient } from '~/utils/rest-client';
import { toastError } from '~/utils/toastr';

const MAX_WORD_COUNT_OF_BODY = 96;

type Props = {
  page: Page;
};

export const PageCard: FC<Props> = ({ page }) => {
  const handleClickPageLink = useCallback(async (pageId: string) => {
    try {
      await restClient.apiPut(`/pages/${pageId}/read`);
    } catch (error) {
      if (error instanceof Error) toastError(error);
    }
  }, []);

  return (
    <Card>
      <Card.Body css={{ p: 0, flex: 'none' }}>
        {/* {page.body ? (
          <Link href={`/page/${page.id}`}>
            <a>
              <FixedImage imageUrl={page.image} />
            </a>
          </Link>
        ) : ( */}
        <a href={page.url} target="blank" rel="noopener noreferrer" onClick={() => handleClickPageLink(page.id)}>
          <FixedImage imageUrl={page.image} />
        </a>
        {/* )} */}
      </Card.Body>
      <Card.Footer css={{ bgColor: '#202020', p: '$4', display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%' }}>
        <Grid css={{ width: '100%', display: 'flex', p: '$0', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* {page.body ? (
            <Link href={`/page/${page.id}`}>
              <a>
                <Text
                  b
                  css={{
                    color: '$white',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    overflowWrap: 'anywhere',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                >
                  {page.title || page.url}
                </Text>
              </a>
            </Link>
          ) : ( */}
          <a href={page.url} target="blank" rel="noopener noreferrer" onClick={() => handleClickPageLink(page.id)}>
            <Text
              b
              css={{
                color: '$white',
                display: '-webkit-box',
                overflow: 'hidden',
                overflowWrap: 'anywhere',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {page.title || page.url}
            </Text>
          </a>
          {/* )} */}
          <PageManageDropdown page={page} />
        </Grid>
        <Text css={{ mt: '$10', mb: '$4', color: '$white', fontSize: '$xs', overflowWrap: 'anywhere' }}>
          {page.description?.length > MAX_WORD_COUNT_OF_BODY ? page.description?.slice(0, MAX_WORD_COUNT_OF_BODY) + '...' : page.description}
        </Text>
        <Grid css={{ width: '100%', mt: 'auto', p: 0, display: 'flex', gap: '$2', alignItems: 'center' }}>
          <Grid css={{ py: 0 }}>
            <Grid css={{ p: 0, display: 'flex', gap: '$2', alignItems: 'center' }}>
              {page.favicon != null && (
                <img
                  width={14}
                  height={14}
                  src={page.favicon || ''}
                  alt={page.favicon || ''}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onError={(e: any) => (e.target.style.display = 'none')}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  decoding="sync"
                />
              )}
              <a href={new URL(page.url).origin} target="blank" rel="noopener noreferrer">
                <Text css={{ color: '$accents8', fontWeight: '$bold', fontSize: '$xs' }}>{page.siteName}</Text>
              </a>
            </Grid>
            <Text css={{ color: '$accents7', fontSize: '$xs' }}>{format(new Date(page.updatedAt), 'yyyy/MM/dd')}</Text>
          </Grid>
        </Grid>
      </Card.Footer>
    </Card>
  );
};
