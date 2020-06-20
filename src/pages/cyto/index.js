import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, message } from 'antd';
import { request } from 'umi';
import cytoscape from 'cytoscape'



export default function index() {
  const containerRef = useRef();
  const cy = useRef();

  var res, err
  var nodesdata = [
    { data: { id: "n1" } },
    { data: { id: "n2" } }
  ]
  var edgesdata = [
    { data: { id: "e1", source: "n1", target: "n2" } }
  ]
  async function getDataAndDraw() {
    res = 0; err = 0;
    [err, res] = await request('/api/getcyto?collectionname=nodes').then(data => [null, data]).catch(err => [err, null])
    console.log(res)
    nodesdata = res.map(item => { return { data: item } })
    res = 0; err = 0;
    [err, res] = await request('/api/getcyto?collectionname=edges').then(data => [null, data]).catch(err => [err, null])
    edgesdata = res.map(item => { return { data: item } });
    console.log(res)
    cy.current.elements().remove();
    cy.current.add(nodesdata);
    cy.current.add(edgesdata);
    console.log(cy.current)
    cy.current.layout({
      name: "grid",
      rows: 2,
      cols: 2
    }).run();
  }
  useEffect(() => {

    const config = {
      container: containerRef.current,
      style: [
        {
          selector: "node",
          style: { content: "data(id)" },
        },
      ],
      elements: {
        nodes: nodesdata,
        edges: edgesdata
      },
    }

    cy.current = cytoscape(config);
    console.log(cy.current)
  }, []);

  return (
    <div>
      <h1>Hello cytoscape</h1>
      <Button id="getDataAndDraw" onClick={getDataAndDraw}>getDataAndDraw</Button>
      {/* <Button id="adjustcyto" onClick={adjustcyto}>adjustcyto</Button>
      <Button id="setDataAndSave" onClick={setDataAndSave}>setDataAndSave</Button> */}
      <h1>cyto title Click here to get data and redraw</h1>
      <div className="cy" ref={containerRef} style={{ height: "300px" }} />
    </div>
  );
}