import React, { useEffect, useState, useCallback } from "react";

// Redux - centralized state management
import { useSelector } from "react-redux";

// React Flow
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";

// Alert
import { toast } from "sonner";

// Application components
import SearchJsonInTree from "./SearchJsonInTree";
import DownloadImage from "./DownloadImage";

// Helper function
import { normalizePath } from "../utils/helperFunction/normalizePath";
import { nodesMatchPath } from "../utils/helperFunction/nodesPathMatch";
import { jsonToTreeConversion } from "../utils/helperFunction/jsonToTreeConversion";

// React Config
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 360;

function TreeVisualizerInner() {
  // Redux
  const searchData = useSelector((store) => store.search);
  const jsonData = useSelector((store) => store.jsonInput);

  // view port - react flow
  const { setCenter, getViewport } = useReactFlow();
  const [initialViewport, setInitialViewport] = useState({
    x: 0,
    y: 0,
    zoom: 10,
  });

  // node setting-  react flow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const vp = getViewport();
    setInitialViewport(vp);
  }, []);

  useEffect(() => {
    if (searchData?.length > 5) {
      handleSearch(searchData);
    }
  }, [searchData]);

  // Search Functionality
  function handleSearch(searchTerm) {
    const normalized = normalizePath(searchTerm);

    let foundNode = null;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const isMatch = node.data?.path === normalized;

        if (isMatch) foundNode = node;

        return {
          ...node,
          className: isMatch ? "rf-node highlight" : "rf-node default",
        };
      })
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const isConnected = nodesMatchPath(edge, normalized, nodes);
        return {
          ...edge,
          animated: isConnected,
          className: isConnected ? "rf-edge highlight" : "rf-edge default",
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
        toast.error("No nodes found!!!");
      }
    }, 100);
  }

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes?.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges?.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes?.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      const isPrimitive =
        node.dataType === "string" ||
        node.dataType === "number" ||
        node.dataType === "boolean" ||
        node.dataType === "null";

      const handleCopyPath = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(node.data.path);
        toast.success(`Path copied: ${node.data.path}`);
      };

      const displayLabel = isPrimitive ? (
        <div
          title={`Path: ${node.data.path}\nValue: ${node.data.value ?? "N/A"}`}
          className="cursor-pointer text-center "
          onClick={handleCopyPath}
        >
          <div className="font-semibold">{"Key: " + node.data.label}</div>
          <div className="text-xl text-gray-100">
            {"Value: " + String(node.data.value)}
          </div>
        </div>
      ) : (
        <div
          title={`Path: ${node.data.path}`}
          onClick={handleCopyPath}
          className="cursor-pointer text-center font-semibold"
        >
          {node.data.label}
        </div>
      );

      let nodeClass = "rf-node";
      if (
        searchData?.length > 0 &&
        node.data.path?.toLowerCase() ===
          normalizePath(searchData)?.toLowerCase()
      ) {
        nodeClass += " rf-node-highlight";
      } else if (node.dataType === "Array") {
        nodeClass += " rf-node-array";
      } else if (node.dataType === "object") {
        nodeClass += " rf-node-object";
      } else {
        nodeClass += " rf-node-primitive";
      }

      return {
        ...node,
        draggable: false,
        connectable: false,
        targetPosition: "top",
        sourcePosition: "bottom",
        data: {
          ...node.data,
          label: displayLabel,
        },
        className: nodeClass,
        position: {
          x: nodeWithPosition.x - nodeWidth / 1,
          y: nodeWithPosition.y - nodeHeight / 1,
        },
      };
    });

    return { nodes: newNodes, edges };
  };

  useEffect(() => {
    if (!jsonData) return;

    try {
      const { initialNodes, initialEdges } = jsonToTreeConversion(jsonData);

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } catch (err) {
      toast.error("Error parsing JSON");
    }
  }, [jsonData, searchData]);

  // connecting nodes by edges
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  return (
    <div className="w-full h-screen ">
      <SearchJsonInTree />
      <DownloadImage />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function TreeVisualizer() {
  return (
    <ReactFlowProvider>
      <TreeVisualizerInner />
    </ReactFlowProvider>
  );
}
