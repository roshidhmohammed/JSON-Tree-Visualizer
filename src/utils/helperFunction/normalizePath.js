export const normalizePath = (path) => {
  const normalized = path
    .replace(/^\$\.?/, "root")
    .replace(/\[(\d+)\]/g, ".$1")
    .trim();
  return normalized;
};
