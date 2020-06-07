import React, { useState, useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
export default function index() {
  const containerRef = useRef();

  useEffect(() => {
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
    };

    cytoscape(config);
  }, []);

  return (
    <div>
      <h1>Hello cytoscape</h1>
      <div className="cy" ref={containerRef} style={{ height: "300px" }} />
    </div>
  );
}