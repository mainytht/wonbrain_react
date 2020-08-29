import React, { useRef, useState } from 'react';

import { Button, Row, Col } from 'antd';
import Visjs from '../visjs';
import Markdown from '../markdown';

export default function index(params) {
  const colRef1 = useRef(0);
  const colRef2 = useRef(0);
  const colRef3 = useRef(0);
  const [col1, setCol1] = useState(8);
  const [col2, setCol2] = useState(8);
  const [col3, setCol3] = useState(8);
  return (
    <>
      <Markdown />

      <Button type="primary">Primary Button</Button>
      <Button type="primary">Primary Button</Button>
      <Row>
        <Col ref={colRef1} span={col1}>
          <Visjs />
        </Col>
        <Col ref={colRef1} onClick={() => setCol2(0)} span={col2}>
          111
        </Col>
        <Col ref={colRef1} span={col3}>
          222
        </Col>
      </Row>
      {/* <Visjs/>
    <Visjs/>   */}

      {/* <Col span='24'><Visjs/></Col> */}
    </>
  );
}
