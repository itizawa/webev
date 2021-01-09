import { ComponentProps, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { OgpCard } from '~src/components/organisms/OgpCard';

export default {
  title: 'organisms/OgpCard',
  component: OgpCard,
};

export const _default: Story<ComponentProps<typeof OgpCard>> = () => {
  const url = 'https://qiita.com/';
  const image = 'https://cdn.qiita.com/assets/qiita-fb-41f9429f13a8c56f50dd0ab477c80d26.png';
  const description = 'Qiitaは、プログラマのための技術情報共有サービスです。';
  const title = 'プログラマの技術情報共有サービス - Qiita';

  return (
    <>
      <h4>OgpCard</h4>
      <div className="row">
        <div className="col-6">
          <OgpCard url={url} image={image} description={description} title={title} />
        </div>
      </div>
    </>
  );
};
