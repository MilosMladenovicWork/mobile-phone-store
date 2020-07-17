import React, {useState} from 'react'
import {useSpring, animated, interpolate} from 'react-spring'

import styles from './drop-down-list.module.scss'

import moreImg from '../../img/plus.svg'
import lessImg from '../../img/minus.svg'

let DropDownList = ({children, label, style}) => {

    let [clickedLabel, setClickedLabel] = useState(false)

    const {xy, opacity, display} = useSpring({
        xy: clickedLabel ? [0, 0] : [-10, -10],
        opacity: clickedLabel ? 1 : 0,
        display: clickedLabel ? 'block' : 'none'
    })

    return(
        <ul className={styles.dropDownList}
            style={style}
        >
            {
            label &&
            <li 
                onClick={() => setClickedLabel((prevState) => !prevState)}
                className={styles.dropDownListLabel} 
            >
                {label}
                <img src={clickedLabel ? lessImg : moreImg} alt='expand'/>
            </li>
            }
            <animated.li style={{
                    display,
                    transform: xy.interpolate((x, y) => `translate(${x}px, ${y}px)`),
                    opacity
                }}>
                    {children}
            </animated.li>
        </ul>
    )
}

export default DropDownList