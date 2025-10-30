import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import ReactFlow, {
  // MiniMap,
  Controls,
  // Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow'
import dagre from '@dagrejs/dagre'
import 'reactflow/dist/style.css'
import { traverseJSON } from '../utils/jsonToTreeConversion'
import { toast } from 'sonner'
import SearchJsonInTree from './SearchJsonInTree'

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36




// const normalStyle = {
//   backgroundColor: '#0d9488',
//   color: '#fff',
//   border: '2px solid #14b8a6',
//   borderRadius: '10px',
//   padding: '8px',
//   fontWeight: 600,
// };

// const highlightStyle = {
//   // ...normalStyle,
//   backgroundColor: '#f59e0b',
//   border: '3px solid #fbbf24',
//   color: '#000',
// };

function TreeVisualizerInner() {
  const searchData = useSelector(store => store.search)
  const jsonData = useSelector((store) => store.jsonInput)
  const { setCenter, getViewport  } = useReactFlow();
  const [initialViewport, setInitialViewport] = useState({ x: 0, y: 0, zoom: 0.5 });
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    const vp = getViewport();
    setInitialViewport(vp);
  }, []);

  console.log(initialViewport)

  useEffect(() => {
    // if (searchData?.length <= 5) return;
    // setNodes((nds) =>
    //   nds.map((node) => ({
    //     ...node,
    //     style: node.data.label?.toLowerCase().includes(searchData?.toLowerCase())
    //       && highlightStyle
    //       // : normalStyle,
    //   }))
    // );

    // getLayoutedElements()

    // const match = nodes.find((n) =>
    //   n.data.label?.toLowerCase().includes(searchData?.toLowerCase())
    // );
    // if (match) {
    //   setCenter(match.position.x, match.position.y, { zoom: 1.8, duration: 500 });
    // } else if(!match && searchData?.length>0){
    //   toast.error("No nodes found!!!")
    // }

    // return (()=>{
    //   setCenter(match.position.x=0, match.position.y=0, { zoom: 0, duration: 100 });
    // })

    if(searchData?.length > 5) {
      handleSearch(searchData)
    }
  }, [searchData]);

  const normalize = (path) =>{
    const normalized = path
    .replace(/^\$\.?/, 'root')
    .replace(/\[(\d+)\]/g, '.$1')
    .trim();
    return normalized
  }

  function handleSearch(searchTerm) {
    // if (!searchTerm) return;
  
    const normalized = searchTerm
      .replace(/^\$\.?/, 'root')
      .replace(/\[(\d+)\]/g, '.$1')
      .trim();
  
    let foundNode = null;
  
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const isMatch = node.data?.path === normalized;
  
        if (isMatch) foundNode = node; // Save the matched node reference
  
        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: isMatch ? '#fbbf24' : '#0d9488',
            color: isMatch ? '#000' : '#fff',
            border: isMatch ? '3px solid #f59e0b' : '2px solid #14b8a6',
            animation: isMatch ? 'var(--animate-ping)' : 'none',
          },
        };
      })
    );
  
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const isConnected = ndsMatchPath(edge, normalized, nodes);
        return {
          ...edge,
          animated: isConnected,
          style: {
            stroke: isConnected ? '#f59e0b' : '#94a3b8',
            strokeWidth: isConnected ? 3 : 1.5,
          },
        };
      })
    );
  
    // Wait for ReactFlow to apply node changes before centering
    setTimeout(() => {
      if (foundNode) {
        setCenter(foundNode.position.x, foundNode.position.y, {
          zoom: 1,
          duration: 500,
        });
      } else {
        setCenter(initialViewport.x, initialViewport.y, {
          zoom: initialViewport.zoom,
          duration: 500,
        });
        // getViewport()
        toast.error('No nodes found!!!');
      }
    }, 100);
  }
  
  function ndsMatchPath(edge, path, allNodes) {
    const targetNode = allNodes.find((n) => n.id === edge.target);
    return targetNode && targetNode.data?.path?.startsWith(path);
  }
  


  const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    // const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })
  
    nodes?.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
    })
  
    edges?.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })
  
    dagre.layout(dagreGraph)
  
    const newNodes = nodes?.map((node) => {
      console.log(nodes)
      const nodeWithPosition = dagreGraph.node(node.id)
      return {
        style: {
          backgroundColor: (searchData?.length>0 && node.data.path?.toLowerCase() === (normalize(searchData))?.toLowerCase()) ? "yellow": node.dataType === "Array" ? "green" : node.dataType === "object" ? "blue" :  "#0d9488",
          color: 'white',
          border: '2px solid #14b8a6',
          borderRadius: '10px',
          padding: '8px',
          fontWeight: 600,
          fontSize: '14px',
        },
        ...node,
        draggable:false,
        connectable:false,
        targetPosition:  'top',
        sourcePosition:  'bottom',
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      }
    })
  
    return { nodes: newNodes, edges }
  }




  useEffect(() => {
    if (!jsonData) return

    try {
      // 1️⃣ Convert JSON to node/edge structure
      const { initialNodes, initialEdges } = traverseJSON(jsonData)

      // 2️⃣ Auto-layout using dagre
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges)

      // 3️⃣ Set in ReactFlow
      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
    } catch (err) {
      toast.error("Error parsing JSON")
    }
  }, [jsonData, searchData])

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  )

  return (
    <div className="w-full h-screen ">
      <SearchJsonInTree/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        {/* <MiniMap /> */}
        <Controls />
        {/* <Background /> */}
      </ReactFlow>
    </div>
  )
}

// export default TreeVisualizer

export default  function TreeVisualizer() {
  return (
    <ReactFlowProvider>
      <TreeVisualizerInner />
    </ReactFlowProvider>
  );
}
