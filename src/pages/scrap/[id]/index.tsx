import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, VFC } from 'react';

import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { Emoji, EmojiData, emojiIndex } from 'emoji-mart';
import { format } from 'date-fns';

import { openFileFolderEmoji } from '~/const/emoji';
import { imagePath } from '~/const/imagePath';

import { useLocale } from '~/hooks/useLocale';

import { IconButton } from '~/components/base/molecules/IconButton';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { UserIcon } from '~/components/domain/User/atoms/UserIcon';
import { PagePreviewCard } from '~/components/domain/Page/molecules/PagePreviewCard';

import { useScrapById } from '~/stores/scrap';
import { useCurrentUser, useUserById } from '~/stores/user';
import { FixedImage } from '~/components/base/atoms/FixedImage';

const emojiSize = 24;

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { id: scrapId } = router.query;

  const { data: currentUser } = useCurrentUser();
  const { data: scrap, isValidating: isValidatingScrap } = useScrapById({ scrapId: scrapId as string });
  const { data: createdUser } = useUserById({ userId: scrap?.createdUser });

  const [emoji, setEmoji] = useState<EmojiData>(openFileFolderEmoji);

  useEffect(() => {
    if (scrap != null) {
      const result = emojiIndex.search(scrap.emojiId);
      if (result != null) {
        setEmoji(result[0]);
      }
    }
  }, [scrap]);

  if (isValidatingScrap) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (scrap == null) {
    return (
      <>
        <WebevOgpHead title={`Webev | ${t.data_not_found}`} />
        <div className="p-3">
          <h1 className="m-3 text-center">{t.data_not_found}</h1>
          <div className="w-50 mx-auto">
            <Image src={imagePath.SEARCH} height={958} width={1000} />
          </div>
          <h2 className="text-center">
            <Link href="/">
              <a className="text-white webev-anchor">{t.go_to_top}</a>
            </Link>
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${scrap.title}`} />
      <div className="d-flex flex-md-row flex-column flex-md-row-reverse ">
        <div className="col-md-4 px-2">
          {createdUser != null && (
            <>
              <div className="text-center py-3">
                <Link href={`/user/${createdUser._id}`}>
                  <a className="text-white webev-anchor d-flex align-items-center">
                    <UserIcon image={createdUser.image} size={36} isCircle />
                    <span className="ms-3 text-truncate">{createdUser.name}</span>
                  </a>
                </Link>
              </div>
              <hr />
            </>
          )}
          <FixedImage imageUrl={`/api/ogp?title=${scrap.title}&username=${createdUser?.name}`} />
          <div className="d-flex align-items-center mt-3">
            <Emoji emoji={emoji} size={emojiSize} />
            <h5 className="webev-limit-2lines me-auto ms-3">{scrap.title}</h5>
            {createdUser?._id === currentUser?._id && (
              <IconButton color="LIGHT" activeColor="LIGHT" icon="PENCIL" onClickButton={() => router.push(`/scrap/${scrap._id}/edit`)} />
            )}
          </div>
          <p>
            {t.created_at} : {format(new Date(scrap.createdAt), 'yyyy/MM/dd')}
          </p>
          <p>{scrap.body}</p>
        </div>
        <div className="col-md-8 px-2">
          <h2 className="my-3">Page</h2>
          {scrap.pages.map((page) => {
            return (
              <div key={page._id} className="mb-3">
                <PagePreviewCard page={page} onClickCard={() => window.open(page.url, '_blank')} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
