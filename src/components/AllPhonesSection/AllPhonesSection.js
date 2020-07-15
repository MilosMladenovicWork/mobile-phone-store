import React from 'react'

import styles from './all-phones-section.module.scss'

import DropDownList from '../DropDownList'

let AllPhoneSection = () => {
    return (
        <section className={styles.allPhonesSection}>
            <DropDownList label='Filters'>
                <DropDownList label='Brand'>
                    <li>
                        Huawei
                    </li>
                    <li>
                        Sony
                    </li>
                </DropDownList>
                <DropDownList label='RAM'>
                    <li>
                        2GB
                    </li>
                    <li>
                        3GB
                    </li>
                </DropDownList>
            </DropDownList>

            {/* <ul className={styles.filterList}>
                <li>
                    Filters
                </li>
                <li>
                    <ul>
                        <li>
                            Brand
                        </li>
                        <li>
                            <ul>
                                <li>
                                    Huawei
                                </li>
                                <li>
                                    Sony
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul> */}
        </section>
    )
}

export default AllPhoneSection