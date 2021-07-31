import Link from 'next/link';
import { useRouter } from 'next/router';
import { VFC, useState, useEffect } from 'react';

import { format } from 'date-fns';
import styled from 'styled-components';
import { Emoji, EmojiData, emojiIndex } from 'emoji-mart';

import { FixedImage } from '~/components/base/atoms/FixedImage';
import { Scrap } from '~/domains/Scrap';
import { useLocale } from '~/hooks/useLocale';
import { openFileFolderEmoji } from '~/const/emoji';
import { useCurrentUser } from '~/stores/user';
import { IconButton } from '~/components/base/molecules/IconButton';

const emojiSize = 24;

type Props = {
  scrap: Scrap;
};

export const ScrapCard: VFC<Props> = ({ scrap }) => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();

  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);

  useEffect(() => {
    const result = emojiIndex.search(scrap.emojiId);
    if (result != null) {
      setEmoji(result[0]);
    }
  }, [scrap]);

  return (
    <StyledCard className="card border-0 shadow h-100 overflow-hidden">
      <Link href={`/scrap/${scrap._id}`}>
        <a>
          <FixedImage imageUrl={`/api/ogp?title=${scrap.title}`} />
        </a>
      </Link>
      <div className="card-body p-2 d-flex flex-column">
        <div className="d-flex align-items-center">
          <Emoji emoji={emoji} size={emojiSize} />
          <Link href={`/scrap/${scrap._id}`}>
            <a className="webev-anchor text-white me-auto ms-3">
              <span className="webev-limit-2lines">{scrap.title}</span>
            </a>
          </Link>
          {scrap.createdUser === currentUser?._id && (
            <IconButton color="LIGHT" activeColor="LIGHT" icon="PENCIL" onClickButton={() => router.push(`/scrap/${scrap._id}/edit`)} />
          )}
        </div>
        <p className="mb-2">
          {t.created_at} : {format(new Date(scrap.createdAt), 'yyyy/MM/dd')}
        </p>
        {scrap.body != null && <p className="small p-1">{scrap.body}</p>}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: #2f363d;
`;
