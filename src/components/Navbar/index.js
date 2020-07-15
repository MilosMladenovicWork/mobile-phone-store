// import React from 'react'
// import { Link } from 'gatsby'
// import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'

// const Navbar = class extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       active: false,
//       navBarActiveClass: '',
//     }
//   }

//   toggleHamburger = () => {
//     // toggle the active boolean in the state
//     this.setState(
//       {
//         active: !this.state.active,
//       },
//       // after state has been updated,
//       () => {
//         // set the class in state for the navbar accordingly
//         this.state.active
//           ? this.setState({
//               navBarActiveClass: 'is-active',
//             })
//           : this.setState({
//               navBarActiveClass: '',
//             })
//       }
//     )
//   }

//   render() {
//     return (
//       <nav
//         className="navbar is-transparent"
//         role="navigation"
//         aria-label="main-navigation"
//       >
//         <div className="container">
//           <div className="navbar-brand">
//             <Link to="/" className="navbar-item" title="Logo">
//               <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
//             </Link>
//             {/* Hamburger menu */}
//             <div
//               className={`navbar-burger burger ${this.state.navBarActiveClass}`}
//               data-target="navMenu"
//               onClick={() => this.toggleHamburger()}
//             >
//               <span />
//               <span />
//               <span />
//             </div>
//           </div>
//           <div
//             id="navMenu"
//             className={`navbar-menu ${this.state.navBarActiveClass}`}
//           >
//             <div className="navbar-start has-text-centered">
//               <Link className="navbar-item" to="/about">
//                 About
//               </Link>
//               <Link className="navbar-item" to="/products">
//                 Products
//               </Link>
//               <Link className="navbar-item" to="/blog">
//                 Blog
//               </Link>
//               <Link className="navbar-item" to="/contact">
//                 Contact
//               </Link>
//               <Link className="navbar-item" to="/contact/examples">
//                 Form Examples
//               </Link>
//             </div>
//             <div className="navbar-end has-text-centered">
//               <a
//                 className="navbar-item"
//                 href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <span className="icon">
//                   <img src={github} alt="Github" />
//                 </span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
//   }
// }

// export default Navbar

import React, {useState} from 'react'
import {Link} from 'gatsby'

import logo from '../../img/logo.svg'
import menuButton from '../../img/menu-button.svg'

import styles from './navbar.module.scss'

const Navbar = () => {

  let [menuClicked, setMenuClicked] = useState(false)
  console.log(menuClicked)
  return(
    <nav className={styles.navbar}>
      <div className={styles.lPaddingBox}>
        <Link className={styles.navbarLogo}>
          <img src={logo} alt='logo'/>
        </Link>
        <div className={styles.navbarLogoBackground}>
        </div>
        <div className={`${styles.navbarMenuButtonBackground} ${menuClicked ? styles.menuIsClicked : ''}`}>
          <ul className={styles.navbarLinks}>
            <li>On Sale</li>
            <li>Most Popular</li>
            <li>Best Deal</li>
          </ul>
        </div>
        <img 
          className={styles.navbarMenuButton}
          src={menuButton} 
          alt='menu button'
          onClick={() => setMenuClicked((prevState) => !prevState)}
        />
      </div>
    </nav>
  )
}

export default Navbar