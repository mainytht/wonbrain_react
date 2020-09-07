import React from 'react';
import styles from './index.css';

export default () => {
  var db;
  let dbName = 'wonbrain';
  let version = 1;
  const DBOpenRequest = window.indexedDB.open(dbName, version);
  // 如果数据库打开失败
  DBOpenRequest.onerror = () => {
    console.log('数据库打开异常');
  };

  DBOpenRequest.onsuccess = () => {
    // 存储数据结果
    db = DBOpenRequest.result;
  };

  DBOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    db.onerror = function () {
      console.log('数据库打开失败');
    };

    // 创建一个数据库存储对象
    const objectStore = db.createObjectStore(
      'person',
      { autoIncrement: true },
      { keyPath: 'id' },
    );

    objectStore.createIndex('name', 'name', {
      unique: false,
    });
    console.log(objectStore);
  };

  // request.onsuccess = function () {
  //   db = request.result;
  // };

  function addone() {
    var request = db
      .transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ name: '李四', age: 24, email: 'lisi@example.com' });

    request.onsuccess = function (event) {
      console.log('数据写入成功');
      console.log(event);
    };

    request.onerror = function (event) {
      console.log('数据写入失败');
    };
  }

  function readdata() {
    var transaction = db.transaction(['person']);
    var objectStore = transaction.objectStore('person');
    // var request = objectStore.get(1);
    var index = objectStore.index('name');
    var request = index.get('李四');

    request.onerror = function (event) {
      console.log('事务失败');
    };

    request.onsuccess = function (event) {
      if (request.result) {
        console.log(request.result);
        console.log('key: ' + request.result.id);
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
    };
  }

  return (
    <div>
      <button onClick={addone}>添加记录</button>
      <h1 className={styles.title}>data:</h1>
      <button onClick={readdata}>读取记录</button>
    </div>
  );
};
