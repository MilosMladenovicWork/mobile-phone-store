import React, {useState, useEffect} from 'react'

import styles from './all-phones-section.module.scss'

import DropDownList from '../DropDownList'

import mobileImg from '../../img/mobile-sony.png'
import mobileImg2 from '../../img/mobile-huawei.png'
import mobileImg3 from '../../img/mobile-samsung.png'

import notTickedItem from '../../img/not-ticked-item.svg'
import tickedItem from '../../img/ticked-item.svg'

const phones = [
    {
        image:mobileImg,
        name:'Sony Xperia Pro',
        brand:'Sony',
        RAM:'3GB'
    },
    {
        image:mobileImg2,
        name:'Huawei P30 Lite',
        brand:'Huawei',
        RAM:'2GB'
    },
    {
        image:mobileImg3,
        name:'Samsung Galaxy A50',
        brand:'Samsung',
        RAM:'6GB'
    },
]

const brands = []

phones.forEach(phone => {
    if(brands.indexOf(phone.brand) == -1){
        brands.push(phone.brand)
    }
})

const ram = []

phones.forEach(phone => {
    if(ram.indexOf(phone.RAM) == -1){
        ram.push(phone.RAM)
    }
})

ram.sort((a, b) => a.split('')[0] - b.split('')[0])

let AllPhoneSection = () => {

    let [numOfPhonesToShow, setNumOfPhonesToShow] = useState(5)
    let [filters, setFilters] = useState([])
    let [phonesFiltered, setPhonesFiltered] = useState([])

    useEffect(() => {
        setPhonesFiltered(
            phones.filter(phone => {
                let matchFilters = filters.map(filter => {
                    return filter.value.indexOf(phone[filter.filter]) == -1
                })
        
                return matchFilters.indexOf(true) == -1
            }
            )
        )
    }, [filters])

    useEffect(() => {
        console.log(filters)
        console.log(filters.map(filter => filter.value.length === 0).indexOf(false))
        if(phonesFiltered.length === 0 && filters.map(filter => filter.value.length === 0).every(boolean => boolean == true)){
            setPhonesFiltered(phones)
        }
    }, [filters, phonesFiltered])

    let toggleFilter = (filterGroup, filter) => setFilters((prevState) => {

        let filterGroupIndex = prevState.map(filter => filter.filter == filterGroup).indexOf(true)

        if(filterGroupIndex != -1){
            let indexOfFilter = prevState[filterGroupIndex].value.indexOf(filter)
            if(indexOfFilter == -1){

                let filters = [
                    ...prevState, 
                ]

                filters[filterGroupIndex].value = [...filters[filterGroupIndex].value, filter]

                return filters
            }else{
                let filters = [
                    ...prevState, 
                ]
                filters[filterGroupIndex].value.splice(indexOfFilter, 1)
                
                if(filters[filterGroupIndex].value.length === 0){
                    filters.splice(filterGroupIndex, 1)
                }
                
                return filters
            }
        }else{
            return [...prevState, {
                filter:filterGroup,
                value:[filter]
            }]
        }
    }
    )

    let filterActive = (filterGroup, filter) => {
        let filterGroupIndex = filters.map(filter => filter.filter == filterGroup).indexOf(true)
        if(filterGroupIndex != -1){
            let indexOfFilter = filters[filterGroupIndex].value.indexOf(filter)
            return indexOfFilter != -1
        }
    }

    return (
        <section className={styles.allPhonesSection}>
            <div className={styles.lBorderContainer}>
                <DropDownList label='Filters' style={{
                    paddingLeft:'0'
                }}>
                    <DropDownList label='Brand'>
                        <ul>
                            {brands.map((brand, index) => {
                                return(
                                <li className={styles.filterItem} key={index} onClick={() => toggleFilter('brand', brand)}>
                                    <img src={filterActive('brand', brand) ? tickedItem : notTickedItem} alt='click to choose this brand'/>
                                    {brand}
                                </li>
                                )
                            })}
                        </ul>
                    </DropDownList>
                    <DropDownList label='RAM'>
                        <ul>
                            {ram.map((RAM, index) => {
                                return(
                                    <li className={styles.filterItem} key={index} onClick={() => toggleFilter('RAM', RAM)}>
                                        <img src={filterActive('RAM', RAM) ? tickedItem : notTickedItem} alt='click to choose this ammount of RAM'/>    
                                        {RAM}
                                    </li>
                                )
                            })}
                        </ul>
                    </DropDownList>
                </DropDownList>
            </div>
            <div className={styles.productResults}>
                {phonesFiltered.map((phone, index) => {
                    if(index < numOfPhonesToShow){
                        return(
                            <figure key={index} className={styles.product}>
                                <img src={phone.image} alt={`${phone.name} front`} />
                                <figcaption>{phone.name}</figcaption>
                            </figure>
                        )
                    }
                })}
                <button
                    className={styles.seeMoreButton} 
                    onClick={() => setNumOfPhonesToShow((prevState) => prevState + 10)}
                    style={{
                        display: phones.length < numOfPhonesToShow ? 'none' : 'block'
                    }}    
                >See More</button>
            </div>
        </section>
    )
}

export default AllPhoneSection