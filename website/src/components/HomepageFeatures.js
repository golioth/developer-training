import React from 'react'
import clsx from 'clsx'
import styles from './HomepageFeatures.module.css'
import ThemedImage from '@theme/ThemedImage'

const FeatureList = [
  {
    title: 'Learn About Golioth',
    link: 'golioth-exploration',
    img: require('@site/static/img/Golioth_logo_300x300.png').default,
    description: (
      <>
        This guide is for Developers to understand the various features of
        Golioth and how we can assist IoT deployments. Along the way, Developers
        will learn skills for making resiliant IoT systems on both the embedded
        and Cloud side.
      </>
    ),
  },
  {
    title: 'Zephyr Training',
    link: 'zephyr-training',
    img: require('@site/static/img/Zephyr_logo_300x300.png').default,
    description: (
      <>
        Our users find that <a href='https://zephyrproject.org/'>Zephyr RTOS</a>{' '}
        provides maximum hardware control and flexibility for their client or
        company projects. After getting started quickly, users will learn how to
        properly set up a Zephyr project and be ready to deploy a professional
        project.
      </>
    ),
  },
  {
    title: 'Golioth REST API Training',
    link: 'api-training',
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
]

function Feature({ Svg, img, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <a href={link}>
          {Svg && <Svg className={styles.featureSvg} alt={title} />}

          {title === 'Golioth REST API Training' && (
            <ThemedImage
              height={150}
              alt='REST API Training'
              sources={{
                light:
                  require('@site/static/img/API_Training_logo_300x300-coral.png').default,
                dark: require('@site/static/img/API_Training_logo_300x300.png').default,
              }}
            />
          )}
          {img && <img width={150} src={img} alt={title} />}
        </a>
      </div>
      <div className='text--center padding-horiz--md'>
        <a href={link}>
          <h3>{title}</h3>
        </a>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
