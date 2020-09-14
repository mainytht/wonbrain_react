import React from 'react';
import styles from './index.css';

const Temp = (props) => {
  return (
    <Fragment>
      <li>list 1</li>
      <li>list 2</li>
    </Fragment>
  );
};

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page test</h1>
    </div>
  );
};
