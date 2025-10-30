export function traverseJSON(jsonData) {
    let nodeId = 1;
    const position = { x: 0, y: 0 };
    const edgeType = 'smoothstep';
  
    const nodes = [];
    const edges = [];
  
    function recurse(data, parentId = null, label = 'root', path = '') {
      const currentId = (nodeId++).toString();
      const currentPath = path ? `${path}.${label}` : label;
  
      nodes.push({
        id: currentId,
        data: { label, path: currentPath },
        dataType: Array.isArray(data) ? 'Array' : typeof data,
        position,
        type:
          parentId === null
            ? 'input'
            : typeof data !== 'object' || data === null
            ? 'output'
            : 'default',
      });
  
      if (parentId) {
        edges.push({
          id: `e${parentId}-${currentId}`,
          source: parentId,
          target: currentId,
          type: edgeType,
          animated: true,
        });
      }
  
      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          data.forEach((item, i) => recurse(item, currentId, `[${i}]`, currentPath));
        } else {
          Object.entries(data).forEach(([key, value]) =>
            recurse(value, currentId, key, currentPath)
          );
        }
      } else {
        const valId = `${currentId}-val`;
        nodes.push({
          id: valId,
          data: { label: String(data), path: currentPath },
          position,
          type: 'output',
        });
        edges.push({
          id: `e${currentId}-${valId}`,
          source: currentId,
          target: valId,
          type: edgeType,
          animated: true,
        });
      }
    }
  
    recurse(jsonData);
    console.log(nodes)
    return { initialNodes: nodes, initialEdges: edges };
  }
  