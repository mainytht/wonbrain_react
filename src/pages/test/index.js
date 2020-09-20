import React, { useRef } from 'react';
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
  const pdfref = useRef();
  function handleclick() {
    pdfref.current.innerHTML = 'asdfds';
  }
  return (
    <div>
      <button onClick={handleclick}></button>
      <h1 className={styles.title}>Page mockdemo</h1>
      <div ref={pdfref}></div>
      <Temp />
    </div>
  );
};
