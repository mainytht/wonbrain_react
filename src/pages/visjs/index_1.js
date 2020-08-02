import React, { useCallback, useState } from 'react';
import './index.css';

import VisNetworkReactComponent from 'vis-network-react';

let defaultdata = {
  nodes: [
    {
      id: 1,
      value: 2,
      fixed: {
        x: true,
        y: true,
      },
      label: 'Node 1',
    },
    {
      id: 2,
      value: 4,
      fixed: {
        x: true,
        y: true,
      },
      font: {
        size: 12,
        color: 'red',
        align: 'center',
        face: 'sans',
        background: 'white',
      },
      label: 'Node 2222222222222',
    },
    {
      id: 3,
      fixed: {
        x: true,
        y: true,
      },
      font: { multi: 'md', align: 'left', face: 'georgia' },
      label: '*This* is a\n_markdown_ *_multi-_ font* \n`label`',
      value: 12,
    },
    { id: 4, value: 22, label: 'Node 4' },
    {
      id: 5,
      value: 33,
      font: { multi: 'html', align: 'center' },
      label:
        '<b>This</b> is a\n<i>default</i> <b><i>multi-</i>font</b> <code>label</code>Nodes can be all kinds of colors. This example shows all possible ways of defining colors. If you supply an object, the undefined fields will assume the default colors.\n When supplying a hex or rgb format color, it will be parsed and variations will be created for highlight and hover.\n Edges with inheritColor take the border colors.<br>Nodes can be all kinds of colors. This example shows all possible ways of defining colors. If you supply an object, the undefined fields will assume the default colors. When supplying a hex or rgb format color, it will be parsed and variations will be created for highlight and hover. Edges with inheritColor take the border colors.\n',
    },
    {
      id: 6,
      value: 33,
      font: { color: 'purple', multi: 'html', align: 'center' },
      label:
        '<b>This</b> is a\n<i>default</i> <b><i>multi-</i>font</b> <code>label if else </code>',
    },
  ],
  edges: [
    { from: 1, value: 2, to: 3 },
    { from: 1, value: 12, to: 2 },
    { from: 2, value: 22, to: 4 },
    { from: 2, value: 32, to: 5 },
    { from: 3, value: 42, to: 3 },
    { from: 1, value: 8, to: 6 },
  ],
};

let events = {
  click: function(params) {
    params.event = '[original event]';
    console.log(
      'click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM),
    );
  },
  doubleClick: function(params) {
    console.log('doubleClick Event:', params);
    params.event = '[original event]';
  },
  oncontext: function(params) {
    console.log('oncontext Event:', params);

    params.event = '[original event]';
  },
  dragStart: function(params) {
    // There's no point in displaying this event on screen, it gets immediately overwritten
    params.event = '[original event]';
    console.log('dragStart Event:', params);
    console.log(
      'dragStart event, getNodeAt returns: ' +
        this.getNodeAt(params.pointer.DOM),
    );
  },
  dragging: function(params) {
    params.event = '[original event]';
  },
  dragEnd: function(params) {
    params.event = '[original event]';
    console.log('dragEnd Event:', params);
    console.log(
      'dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM),
    );
  },
  controlNodeDragging: function(params) {
    params.event = '[original event]';
  },
  controlNodeDragEnd: function(params) {
    params.event = '[original event]';
    console.log('controlNodeDragEnd Event:', params);
  },
  zoom: function(params) {},
  showPopup: function(params) {},
  hidePopup: function() {
    console.log('hidePopup Event');
  },
  select: function(params) {
    console.log('select Event:', params);
  },
  selectNode: function(params) {
    console.log('selectNode Event:', params);
  },
  selectEdge: function(params) {
    console.log('selectEdge Event:', params);
  },
  deselectNode: function(params) {
    console.log('deselectNode Event:', params);
  },
  deselectEdge: function(params) {
    console.log('deselectEdge Event:', params);
  },
  hoverNode: function(params) {
    console.log('hoverNode Event:', params);
  },
  hoverEdge: function(params) {
    console.log('hoverEdge Event:', params);
  },
  blurNode: function(params) {
    console.log('blurNode Event:', params);
  },
  blurEdge: function(params) {
    console.log('blurEdge Event:', params);
  },
};

function App() {
  const [data, setData] = useState(defaultdata);
  const [networkNodes, setNetworkNodes] = useState([]);

  const handleAddNode = useCallback(() => {
    const id = data.nodes.length + 1;
    setData({
      ...data,
      nodes: [...data.nodes, { id, label: `Node ${id}` }],
    });
  }, [setData, data]);

  const getNodes = useCallback(a => {
    setNetworkNodes(a);
  }, []);

  const handleGetNodes = useCallback(() => {
    console.log(networkNodes);
  }, [networkNodes]);

  return (
    <div className="App">
      <button onClick={handleAddNode}>add random node</button>
      <button onClick={handleGetNodes}>get nodes</button>
      <VisNetworkReactComponent
        data={data}
        options={{
          // layout: {
          //   hierarchical: {
          //     direction: "LR",
          //   },
          // },
          layout: {
            randomSeed: undefined,
            improvedLayout: true,
            clusterThreshold: 150,
            hierarchical: {
              enabled: false,
              levelSeparation: 150,
              nodeSpacing: 100,
              treeSpacing: 200,
              blockShifting: true,
              edgeMinimization: true,
              parentCentralization: true,
              direction: 'UD', // UD, DU, LR, RL
              sortMethod: 'hubsize', // hubsize, directed
              shakeTowards: 'roots', // roots, leaves
            },
          },
          nodes: {
            shape: 'box',
            scaling: {
              customScalingFunction: function(min, max, total, value) {
                return value / total;
              },
              min: 5,
              max: 150,
            },
          },
        }}
        events={events}
        getNodes={getNodes}
      />
    </div>
  );
}

export default App;
