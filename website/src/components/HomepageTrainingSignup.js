import React from 'react'
import clsx from 'clsx'
import styles from './HomepageTrainingSignup.module.css'
import ThemedImage from '@theme/ThemedImage'
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';


const SignupMsg = {
  title: 'Live Zephyr Training',
  description: (
    <>

    In addition to this self-guided website, Golioth offers <em>free</em> Zephyr
    training every month! Sign up now for our next session to get up to speed on
    the basics of Zephyr RTOS with Golioth engineers. This live training is held
    via a video conference platform and offers a guided version of the training
    found on this website.

    </>),
  buttonText: "Sign up for free Zephyr training!",
  link: "https://golioth.io/training-signup"
};

export default function HomepageTrainingSignup() {
  const bannerBgImg = {
    backgroundImage: `url(${useBaseUrl('img/golioth-black-on-charcoal-giants.png')})`
  };
  return (
    <signup className={clsx(styles.heroBanner, styles.signupBanner)} style={bannerBgImg}>
      <div className={styles.container}>
        <h1>{SignupMsg.title}</h1>
        <p>{SignupMsg.description}</p>
        <div>
          <Link
            className={clsx(styles.button, "button button--secondary button--lg")}
            to={SignupMsg.link}>
            {SignupMsg.buttonText}
          </Link>
        </div>
      </div>
    </signup>
  )
}
