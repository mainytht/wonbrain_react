import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

export default function DeleteTable(params) {
  // const tableref = useRef()
  // useEffect(() => {

  
  // }, []);
  const [states, setStates] = useState({
    dataSource: [
      {
        key: 0,
        name: 'Edward King 0',
        age: 32,
        address: 'London, Park Lane no. 0',
      },
      {
        key: 1,
        name: 'Edward King 1',
        age: 32,
        address: 'London, Park Lane no. 1',
      },
    ],
    count: 2,
  });
  const [columns, setColumns] = useState([
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        states.dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => sendkey(record.key)}
          >
            <a> 删除 </a>
          </Popconfirm>
        ) : null,
    },
  ]);

  function sendkey(key) {
    console.log(key);

    handleDelete(key)
  }

  function handleDelete(key) {
    const { count, dataSource } = states;
    // const dataSource = [...states.dataSource];
    console.log(key);
    console.log(states);
    setStates({
      dataSource: dataSource.filter(item => item.key !== key),
      count: count,
    });
  }

  function handlePop() {
    const { count, dataSource } = states;
    // const dataSource = [...states.dataSource];
    console.log(dataSource);
    dataSource.pop();

    setStates({
      dataSource: dataSource,
      count: count,
    });
  }
  function handleAdd() {
    const { count, dataSource } = states;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    setStates({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    console.log(states);
    console.log(newData);
  }

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        增加行
      </Button>
      <Button
        onClick={handlePop}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        删除行
      </Button>
      <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={states.dataSource}
        columns={columns}
      />{' '}
    </div>
  );
}
