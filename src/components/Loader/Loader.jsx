import React from 'react';
import loader from '../../assets/img/loader.svg';
import styles from './Loader.module.scss';

const Loader = ({ width, top, left }) => {
    return <>
        <img className={styles.Loader} style={{ top: top, left: left }} width={width} src={loader} alt="" />
    </>;
};

export default Loader;
