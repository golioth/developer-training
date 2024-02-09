import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageTrainingSignup from '../components/HomepageTrainingSignup';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const heroBannerBgImg = {
    backgroundImage: `url(${useBaseUrl('img/Zephyr-Classroom.jpg')})`
  };
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={heroBannerBgImg}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/golioth-exploration">
            Start the {siteConfig.title}!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Golioth`}
      description="This is a training site for Developers who will use Golioth <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <HomepageTrainingSignup />
    </Layout>
  );
}
