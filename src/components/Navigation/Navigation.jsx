import React from 'react'
import List from '../../common/List/List';
import styles from './Navigation.module.scss';

const navItems = [{ label: 'Home', icon: 'icon' }, { label: 'About', icon: 'icon' },]

const Navigation = () => {
    return (
        <nav className={styles.Navigation}>
            <List listItems={navItems} />
        </nav>
    )
}

export default Navigation
