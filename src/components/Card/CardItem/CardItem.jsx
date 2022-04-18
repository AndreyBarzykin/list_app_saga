import React from 'react'
import styles from './CardItem.module.scss'

const CardItem = ({ children }) => {
    return (
        <span className={styles.CardItem}>
            {children}
        </span>
    )
}

export default CardItem
