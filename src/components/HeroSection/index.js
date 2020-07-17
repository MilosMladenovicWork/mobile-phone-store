import React, { useEffect, useState } from 'react'
import {Parallax} from 'react-scroll-parallax'

import styles from './hero-section.module.scss'

import phoneIllustration from '../../img/phone-illustration.svg'

const HeroSection = () => {

  let [hours, setHours] = useState('00')
  let [minutes, setMinutes] = useState('00')
  let [secondsAreEven, setSecondsAreEven] = useState(false) 

  useEffect(() => {
    let date = new Date()
    let checkInterval = setInterval(() => {
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      setHours(() => hours < 10 ? ('0' + hours) : hours)
      setMinutes(() => minutes < 10 ? ('0' + minutes) : minutes)
      setSecondsAreEven((prevState) => !prevState)
    }, 1000)
    return () => clearInterval(checkInterval)
  })

  return (
    <section className={styles.heroSection}>
        <Parallax x={[0, -15]} className={styles.heroSectionIllustration}>
        <div   >
        <img src={phoneIllustration} alt='phone illustration'/>

        <div className={styles.timeContainer}>
            <p>{hours}</p>
            <p style={{
              opacity:secondsAreEven ? 1 : 0
            }}>:</p>
            <p>{minutes}</p>
        </div>
        <p className={styles.heroIllustrationText}>Scroll down to continue</p>
        </div>
        </Parallax>
        <Parallax x={[-2, 20]} className={styles.heroSectionSmallHeading}>
          <h1 >Find, Compare, Buy.</h1>
        </Parallax>
        <Parallax x={[0, 10]} className={styles.heroSectionHeading}>
          <h1 >It's so simple.</h1>
        </Parallax>
        <Parallax x={[-50, 25]}>
          <div className={styles.heroSectionHeadingBackground}></div>
        </Parallax>
        <Parallax x={[25, -50]}>
          <div className={styles.heroSectionOverLayer}></div>
        </Parallax>
    </section>
  )
}

export default HeroSection