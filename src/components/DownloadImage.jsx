import React from "react";
import { useReactFlow, getNodesBounds, getViewportForBounds } from "reactflow";
import { toPng } from "html-to-image";

const imageWidth = 2048;
const imageHeight = 1528;

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

function DownloadImage() {
  const { getNodes } = useReactFlow();

  const onClick = async () => {
    const flowWrapper = document.querySelector(".react-flow__viewport");
    if (!flowWrapper) return;

    const combined = flowWrapper;

    const svgEdges = combined.querySelectorAll(
      ".react-flow__edges svg, .react-flow__edges path"
    );
    svgEdges.forEach((svg) => {
      svg.setAttribute("stroke", "#94a3b8");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("fill", "none");
      svg.style.visibility = "visible";
    });

    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    try {
      const dataUrl = await toPng(combined, {
        backgroundColor: "#000", // works with dark theme
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
        pixelRatio: 2,
        cacheBust: true,
        skipAutoScale: true,
      });

      downloadImage(dataUrl);
    } catch (err) {
      console.error("Error exporting React Flow:", err);
    }
  };

  return (
    <div className="z-[9999999] fixed sm:top-30 top-20 md:right-20 right-2">
      <button
        onClick={onClick}
        className="download-btn xy-theme__button h-12 flex justify-center items-center bg-gradient-to-r from-pink-500 via-red-500 to-red-500 hover:bg-white text-gray-100 px-4 rounded-lg font-medium cursor-pointer"
      >
        Download Image
      </button>
    </div>
  );
}

export default DownloadImage;
