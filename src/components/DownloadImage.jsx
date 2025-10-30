import React from "react";

// React Flow
import { useReactFlow, getNodesBounds, getViewportForBounds } from "reactflow";

// html to image conversion
import { toPng } from "html-to-image";

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 2048;
const imageHeight = 1528;

function DownloadImage() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "black",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <div className=" z-[9999999]  h-12 flex justify-center items-center bg-linear-to-r from-pink-500 via-red-500 to-red-500 hover:bg-white p-2 rounded-lg cursor-pointer text-gray-100 fixed sm:top-30 top-20  md:right-20 right-2 ">
      <button
        className="download-btn xy-theme__button cursor-pointer"
        onClick={onClick}
      >
        Download Image
      </button>
    </div>
  );
}

export default DownloadImage;
