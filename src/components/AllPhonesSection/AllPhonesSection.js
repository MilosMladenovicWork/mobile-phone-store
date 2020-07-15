import React from 'react'

import styles from './all-phones-section.module.scss'

import DropDownList from '../DropDownList'

let AllPhoneSection = () => {
    return (
        <section className={styles.allPhonesSection}>
            <div className={styles.lBorderContainer}>
                <DropDownList label='Filters' style={{
                    paddingLeft:'0'
                }}>
                    <DropDownList label='Brand'>
                        <ul>
                            <li>
                                Huawei
                            </li>
                            <li>
                                Sony
                            </li>
                        </ul>
                    </DropDownList>
                    <DropDownList label='RAM'>
                        <ul>
                            <li>
                                2GB
                            </li>
                            <li>
                                3GB
                            </li>
                        </ul>
                    </DropDownList>
                </DropDownList>
            </div>

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