export function nodesMatchPath(edge, path, allNodes) {
  const targetNode = allNodes.find((n) => n.id === edge.target);
  return targetNode && targetNode.data?.path?.startsWith(path);
}
