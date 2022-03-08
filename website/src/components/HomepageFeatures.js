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
    title: 'Get Started Quickly',
    Svg: require('../../static/img/magtag.svg').default,
    description: (
      <>
        This dual track training includes pre-configured hardware examples to start investigating Golioth's features. 
        After using CircuitPython's high level interfaces to interact with our various Golioth APIs, we will explore the
        device side examples using the Zephyr RTOS.
      </>
    ),
  },
  {
    title: 'Go in depth on Zephyr',
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
