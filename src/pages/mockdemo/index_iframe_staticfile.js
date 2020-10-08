import React from 'react';
import styles from './index.css';
import Iframe from 'react-iframe';

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
      <div width="400" height="300">
        lalalal
      </div>
      <iframe width="50%" height="300" src="./lalala.html"></iframe>
      <Iframe
        url="./lalala.html"
        width="100%"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
      <img src={require('@/assets/logo2.png')}></img>
    </div>
  );
};
