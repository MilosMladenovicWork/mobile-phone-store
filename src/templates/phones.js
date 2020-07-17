import React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/Layout'

import styles from './phone-page.module.scss'

let PhonePage = ({data}) => {
    console.log(data.markdownRemark.frontmatter.phoneImage)
    return (
    <Layout>
        <section className={styles.phonePageSection}>
            <h1 className={styles.sectionHeading}>{data.markdownRemark.frontmatter.name}</h1>
            <div className={styles.phonePageMainImage}>
                <Img fluid={data.markdownRemark.frontmatter.phoneImage.childImageSharp.fluid} alt={`${data.markdownRemark.frontmatter.name} front`} />
            </div>
            <p>{data.markdownRemark.frontmatter.brand}</p>
            <p>{data.markdownRemark.frontmatter.RAM}</p>
        </section>
    </Layout>
    )
}

export const pageQuery = graphql`
    query PhoneById($id: String!){
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
              name
              brand
              phoneImage{
                  childImageSharp{
                      fluid(maxWidth:2000){
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
              RAM
            }
          }
    }
`

export default PhonePage