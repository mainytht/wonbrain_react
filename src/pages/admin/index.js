import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { request } from 'umi';

export default function DeleteTable(params) {
  const [datacount, setDatacount] = useState(0);
  const [datasource, setDatasource] = useState([]);
  const [columns, setColumns] = useState(0);
  const tablediv = useRef(0);

  window.addEventListener(
    'ehandledelete',
    e => {
      handleDelete(e.detail.data);
    },
    false,
  );

  useEffect(() => {
  
    // useEffect 中调用异步的方式
    (async () => {
        var [err, res] = await request('/api/getcyto?collectionname=nodes').then(data => [null, data]).catch(err => [err, null])
        console.log(res)
      })()
      

    setDatasource([
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
    ]);
    setDatacount(2);


    setColumns([
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
          
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() =>{
                console.log(record.key);
                window.dispatchEvent(new CustomEvent("ehandledelete",{detail:{data:record.key}}))}
              }
            >
              <a> Delete </a>
            </Popconfirm>
          
          
      },
    ]);

  }, []);

  function handlePop() {
    let temp = [...datasource];
    temp.pop();
    setDatasource(temp);
  }
  function handleAdd() {
    const newData = {
      key: datacount,
      name: `Edward King ${datacount}`,
      age: 32,
      address: `London, Park Lane no. ${datacount}`,
    };
    setDatasource([...datasource, newData]);
    setDatacount(datacount + 1);
    console.log(datasource);
    console.log(newData);
  }

  function handleDelete(key) {
    console.log(key);
    console.log(datasource);
    // 此时datasource 是最初的赋值（0），key倒是传过来了， 不知道为什么
    setDatasource(datasource.filter(item => item.key !== key));
  }

  return (
    <div ref={tablediv}>
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
        删除末行
      </Button>
      <Table
        id="mytable"
        // ref={tableref}   funciton 组件不能使用ref
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={datasource}
        columns={columns}
      />
    </div>
  );
}
