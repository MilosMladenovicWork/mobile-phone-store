import React, {useState} from 'react'

import styles from './drop-down-list.module.scss'

import moreImg from '../../img/plus.svg'
import lessImg from '../../img/minus.svg'

let DropDownList = ({children, label, style}) => {

    let [clickedLabel, setClickedLabel] = useState(false)

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
            <li style={{
                    display:clickedLabel ? 'block' : 'none'
                }}>
                    {children}
            </li>
        </ul>
    )
}

export default DropDownList