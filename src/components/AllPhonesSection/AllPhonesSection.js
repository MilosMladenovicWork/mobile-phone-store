import React, {useState, useEffect} from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './all-phones-section.module.scss'

import DropDownList from '../DropDownList'

import mobileImg from '../../img/mobile-sony.png'
import mobileImg2 from '../../img/mobile-huawei.png'
import mobileImg3 from '../../img/mobile-samsung.png'

import notTickedItem from '../../img/not-ticked-item.svg'
import tickedItem from '../../img/ticked-item.svg'
import xButton from '../../img/x-button.svg'


let AllPhoneSection = () => {

    const phonesQuery = useStaticQuery(graphql`
    query MyQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "phones"}}}) {
            edges{
                node{
                    fields{
                        slug
                    }
                    frontmatter {
                      name
                      brand
                      RAM
                      phoneImage{
                        childImageSharp {
                            fluid(maxWidth: 2000){
                              ...GatsbyImageSharpFluid
                            }
                          }
                      }
                    }
                }
            }
        }
      }
    `)

    let phones = phonesQuery.allMarkdownRemark.edges.map(phone => Object.assign(phone.node.frontmatter, {slug:phone.node.fields.slug}))
    
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

    let activeFilters = () => {
        let activeFilters = []
        filters.forEach(filterGroup => {
            filterGroup.value.forEach(filter => {
                activeFilters.push({filterGroup:filterGroup.filter, filter})
            })
        })
        return activeFilters
    }

    console.log(phonesFiltered)

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
            <div className={styles.activeFilters}>
                {activeFilters().map((activeFilter, index) => {
                    return <div 
                        className={styles.filterTag} 
                        key={index}
                        onClick={() => toggleFilter(activeFilter.filterGroup, activeFilter.filter)}
                    >
                                <p>
                                    {activeFilter.filterGroup}: {activeFilter.filter}
                                </p>
                                <img className={styles.filterTagButton} src={xButton} alt='remove filter' />
                           </div>
                })}
            </div>
            <div className={styles.productResults}>
                {phonesFiltered.map((phone, index) => {
                    if(index < numOfPhonesToShow){
                        return(
                                <Link to={phone.slug}>
                                    <figure key={index} className={styles.product}>
                                        <div className={styles.productImage}>
                                            <Img fluid={phone.phoneImage.childImageSharp.fluid} alt={`${phone.name} front`} />
                                        </div>
                                        <figcaption>{phone.name}</figcaption>
                                    </figure>
                                </Link>
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