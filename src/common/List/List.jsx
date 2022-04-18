import React from 'react'
import ListItem from './ListItem/ListItem'
import styles from './List.module.scss';

const List = ({ listItems, children }) => {
    return (
        <ul className={styles.list}>
            {/* {console.log(listItems)}
            {listItems.map((item) => <ListItem item={item} key={item.label + Date.now()} />)} */}
            {children}
        </ul>
    )
}

export default List
