export function jsonToTreeConversion(jsonData) {
  let nodeId = 1;
  const position = { x: 0, y: 0 };
  const edgeType = "smoothstep";

  const nodes = [];
  const edges = [];

  function recurseJsonObject(data, parentId = null, label = "root", path = "") {
    const currentId = (nodeId++).toString();
    const currentPath = path ? `${path}.${label}` : label;

    const isPrimitive = typeof data !== "object" || data === null;
    const isArray = Array.isArray(data);

    nodes.push({
      id: currentId,
      data: {
        label,
        path: currentPath,
        value: isPrimitive ? String(data) : "",
      },
      dataType: isArray ? "Array" : typeof data,
      position,
      type: parentId === null ? "input" : isPrimitive ? "output" : "default",
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

    if (typeof data === "object" && data !== null) {
      if (isArray) {
        data.forEach((item, i) =>
          recurseJsonObject(item, currentId, `[${i}]`, currentPath)
        );
      } else {
        Object.entries(data).forEach(([key, value]) =>
          recurseJsonObject(value, currentId, key, currentPath)
        );
      }
    }
  }

  recurseJsonObject(jsonData);
  return { initialNodes: nodes, initialEdges: edges };
}
