import React, {useState} from 'react'

let DropDownList = ({className, children, label}) => {

    let [clickedLabel, setClickedLabel] = useState(false)

    return(
        <ul className={className}>
            {
            label &&
            <li onClick={() => setClickedLabel((prevState) => !prevState)}>
                {label}
            </li>
            }
            <li style={{
                    display:clickedLabel ? 'block' : 'none'
                }}>
                <ul>
                    {children}
                </ul>
            </li>
        </ul>
    )
}

export default DropDownList