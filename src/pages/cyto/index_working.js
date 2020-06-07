import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, message } from 'antd';
import { request } from 'umi';
import cytoscape from 'cytoscape'
function getDataAndDraw() {
  // this.dataloaded = 0; //尚未实现
  // await this.getData("nodes");
  // await this.getData("edges");
  // cy.elements().remove();
  // cy.add(this.allnodes);
  // cy.add(this.alledges);
  // console.log(this.allnodes);
  // console.log(this.alledges);
  // this.drawGraph();
  //如果用       this.getData("nodes");      this.getData("edges");      this.drawGraph(); 要点击两次才能刷新 ,还是因为是异步的，还没有获取到数据
}

export default function index() {


  // async getData(collname) {
  //   try {
  //     await this.$axios
  //       .get("/api/getcyto?collectionname=" + collname)
  //       .then(result => {
  //         // console.log(this.allnodes);
  //         // console.log(result.data);
  //         //必须等于null，否则会各种怪异
  //         let tmparr = [];
  //         for (var item of result.data) {
  //           let tmpvar = {};
  //           tmpvar.data = item;
  //           // console.log(tmpvar);
  //           tmparr.push(tmpvar);
  //         }
  //         //[]是将内部的字符串名当做属性名传递，注意没有.
  //         this["all" + collname] = tmparr;
  //       });
  //   } catch (error) {
  //     this.dataloaded = 0;
  //     console.log(error);
  //   }
  // },


  // const nodesres = useRequest('/api/getcyto?collectionname=nodes');
  // if (!nodesres.error && !nodesres.loading) {
  //   console.log(nodesres)
  // }

  // const edgesres = useRequest('/api/getcyto?collectionname=edges');
  // if (!edgesres.error && !edgesres.loading) {
  //   console.log(edgesres)
  // }
  // const {nodedata,setNodedata} = useState(0);
  // const {edgedata,setEdgedata} = useState(0);
  // const { data, error, loading } = useRequest('/api/getcyto?collectionname=edges');
  //解构用法在多次使用时，会有变量冲突

  const containerRef = useRef(0);
  const { nodesdata, setNodesdata } = useState([]);
  const { edgesdata, setEdgesdata } = useState([]);
  request('/api/getcyto?collectionname=nodes')
    .then(res => {
      setNodesdata(res)
    })
    .catch(err => {
      console.log(err);
    });

  request('/api/getcyto?collectionname=edges')
    .then(res => {

      setEdgesdata(res)
    })
    .catch(err => {
      console.log(err);
    });


  useEffect(() => {

    // const { data, error, loading } = useRequest('/api/getcyto?collectionname=edges');
    // 不能在内部使用钩子

    const config = {
      container: containerRef.current,
      style: [
        {
          selector: "node",
          style: { content: "data(id)" },
        },
      ],
      elements: [
        { data: { id: "n1" } },
        { data: { id: "n2" } },
        { data: { id: "e1", source: "n1", target: "n2" } },
      ],
    }
    console.log(config)
    cytoscape(config);

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