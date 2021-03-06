import { FC, PropsWithChildren } from 'react';
import type { NextPage } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import MainBox from '@/components/layout/main-box';
import TopNav from '@/components/layout/top-nav';
import AsideNav from '@/components/layout/aside-nav';
import MainContent from '@/components/layout/main-content';
import Slide from '@/components/widget/slide';
import Audio from '@/components/widget/audio';
import BottomNav from '@/components/layout/bottom-nav';
import ContentProvider from '@/state/context/content-context';
import UserStateProvider from '@/state/context/user-context';
import MusicStateProvider from '@/state/context/music-context';
import ThemeProvider from '@/state/context/theme-context';
import SwitchContent from '@/content/router';
import styles from './index.module.css';

const { publicRuntimeConfig } = getConfig();

const ProviderAggregate: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <UserStateProvider>
        <MusicStateProvider>
          <ContentProvider>
            {children}
          </ContentProvider>
        </MusicStateProvider>
      </UserStateProvider>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Magi Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons/cloud.svg" />
      </Head>

      <div className={styles.main}>
        <ThemeProvider>
          <MainBox>
            <ProviderAggregate>
              <TopNav />
              <div className={styles.centerBox}>
                <AsideNav />
                <MainContent>
                  <SwitchContent />
                </MainContent>
                <Slide />
              </div>
              <BottomNav />
              <Audio />
            </ProviderAggregate>
          </MainBox>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Home;
