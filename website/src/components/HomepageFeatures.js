import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Learn About Golioth',
    Svg: require('../../static/img/logo.svg').default,
    description: (
      <>
        This guide is for Developers to understand the various features of Golioth and how we can assist IoT deployments.
        Along the way, Developers will learn skills for making resiliant IoT systems on both the embedded and Cloud side.
      </>
    ),
  },
  {
    title: 'Golioth API Training',
    Svg: require('../../static/img/golioth-g-gradient-cloud.svg').default,
    description: (
      <>
        Golioth makes it easy to interact with your IoT devices and their data.
        This REST API training module will familiarize you with how devices are
        represented in the cloud. You'll learn how monitor and control your
        fleet, and access the time-series and stateful data being collected from
        it.
      </>
    ),
  },
  {
    title: 'Zephyr Training',
    Svg: require('../../static/img/zephyr.svg').default,
    description: (
      <>
        Our users find that <a href="https://zephyrproject.org/">Zephyr RTOS</a> provides maximum hardware control and
        flexibility for their client or company projects.
        After getting started quickly, users will learn how to properly set up a Zephyr project and be ready to deploy
        a professional project.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
