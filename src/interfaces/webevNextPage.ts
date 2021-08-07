import { NextPage } from 'next';
import { ReactNode } from 'react';

export type WebevNextPage = NextPage & { getLayout: (page: ReactNode) => JSX.Element };
