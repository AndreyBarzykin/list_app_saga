import React from 'react'
import styles from './ListItem.module.scss';

const ListItem = ({ item }) => {
    return (
        <li className={styles.listItem}>
            <span>{item.label}</span>
        </li>
    )
}

export default ListItem
