import { NextPage } from 'next';
import { ReactNode } from 'react';

export type WebevNextPage<T = {}> = NextPage<T> & { getLayout: (page: ReactNode) => JSX.Element };
