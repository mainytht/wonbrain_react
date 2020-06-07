import React, { useState, useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
export default function index() {
  const refcy = useRef()
  const graph = useRef(cytoscape.Core);
  const layout = useRef(cytoscape.Layouts);
  const [count, setCount] = useState(0);

  useEffect(() => {

    graph.current = cytoscape({
      container: refcy.current, // container to render in
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      maxZoom: 1
    })
    layout.current = graph.current.makeLayout({
      name: "random"
    });
    layout.current.run()
  },[]);

  useEffect(() => { document.title = `You clicked ${count} times`; })


  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div style={{ height: "300px" }} ref={refcy}>
        ************8
       </div>
    </div>
  );
}