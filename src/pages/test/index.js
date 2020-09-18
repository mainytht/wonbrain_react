import React from 'react';
import styles from './index.css';

const Temp = (props) => {
  return (
    <>
      <li>list 1</li>
      <li>list 2</li>
    </>
  );
};

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page mockdemo</h1>
      <Temp />
    </div>
  );
};
