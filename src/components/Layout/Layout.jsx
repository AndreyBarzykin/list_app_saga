import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'
import EditCardForm from '../EditCardForm/EditCardForm'
const Layout = ({ children }) => {
    return (
        <div className={styles.Layout}>
            <Sidebar />
            <Navigation />
            <main className={styles.Main}>{children}</main>
            <Footer />
            <EditCardForm />
        </div>
    )
}

export default Layout
