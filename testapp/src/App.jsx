import { useState } from "react";
import "./App.css";

function App() {
  const [tab, setTab] = useState("font-size");
  const fontSizes = [
    ["text-xs", "text-vw-xxs"],
    ["text-xs", "text-vw-xs"],
    ["text-sm", "text-vw-sm"],
    ["text-base", "text-vw-base"],
    ["text-lg", "text-vw-lg"],
    ["text-xl", "text-vw-xl"],
    ["text-2xl", "text-vw-2xl"],
    ["text-3xl", "text-vw-3xl"],
    ["text-4xl", "text-vw-4xl"],
    ["text-5xl", "text-vw-5xl"],
    ["text-6xl", "text-vw-6xl"],
    ["text-7xl", "text-vw-7xl"],
    ["text-8xl", "text-vw-8xl"],
    ["text-9xl", "text-vw-9xl"],
  ];
  const spacings = [
    ["size-1", "size-vw-1"],
    ["size-2", "size-vw-2"],
    ["size-3", "size-vw-3"],
    ["size-4", "size-vw-4"],
    ["size-4.5", "size-vw-4.5"],
    ["size-5", "size-vw-5"],
    ["size-6", "size-vw-6"],
    ["size-7", "size-vw-7"],
    ["size-8", "size-vw-8"],
    ["size-9", "size-vw-9"],
    ["size-10", "size-vw-10"],
    ["size-11", "size-vw-11"],
    ["size-12", "size-vw-12"],
    ["size-14", "size-vw-14"],
    ["size-16", "size-vw-16"],
    ["size-18", "size-vw-18"],
    ["size-20", "size-vw-20"],
    ["size-24", "size-vw-24"],
    ["size-28", "size-vw-28"],
    ["size-32", "size-vw-32"],
    ["size-36", "size-vw-36"],
    ["size-40", "size-vw-40"],
    ["size-44", "size-vw-44"],
    ["size-48", "size-vw-48"],
    ["size-52", "size-vw-52"],
    ["size-56", "size-vw-56"],
    ["size-60", "size-vw-60"],
    ["size-64", "size-vw-64"],
    ["size-72", "size-vw-72"],
    ["size-80", "size-vw-80"],
    ["size-96", "size-vw-96"],
  ];
  const borderRaduises = [
    ["rounded-sm", "rounded-vw-sm"],
    ["rounded", "rounded-vw"],
    ["rounded-md", "rounded-vw-md"],
    ["rounded-lg", "rounded-vw-lg"],
    ["rounded-xl", "rounded-vw-xl"],
    ["rounded-2xl", "rounded-vw-2xl"],
    ["rounded-3xl", "rounded-vw-3xl"],
    ["rounded-4xl", "rounded-vw-4xl"],
  ];

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button
          type="button"
          className="p-2 bg-zinc-200"
          onClick={() => setTab("font-size")}
        >
          font sizes
        </button>
        <button
          type="button"
          className="p-2 ml-2 bg-zinc-200"
          onClick={() => setTab("spacing")}
        >
          spacing
        </button>
        <button
          type="button"
          className="p-2 ml-2 bg-zinc-200"
          onClick={() => setTab("border-radius")}
        >
          border raduis
        </button>
        <button
          type="button"
          className="p-2 ml-2 bg-zinc-200"
          onClick={() => setTab("other")}
        >
          other
        </button>
      </div>

      {tab === "font-size" && (
        <div>
          {fontSizes.map(([size, vwSize], idx) => (
            <div key={idx} className="flex flex-col mt-4 font-mono whitespace-nowrap">
              <p className={size}>Normal spacing</p>
              <p className={`${vwSize} mt-2`}>Fluid spacing!</p>
            </div>
          ))}
        </div>
      )}

      {tab === "spacing" && (
        <div>
          {spacings.map(([size, sizeVw], idx) => (
            <div key={idx} className="flex items-center mt-4">
              <div className={`${size} bg-green-500`}></div>
              <div className={`${sizeVw} bg-zinc-500 ml-2`}></div>
            </div>
          ))}

          <h3 className="text-vw-xl">Extra</h3>

          <div className="flex items-center mt-4">
            <div className="size-112 bg-green-500"></div>
            <div className="size-vw-112 bg-zinc-500 ml-2"></div>
          </div>
          <div>
            <div className="size-128 bg-green-500"></div>
            <div className="size-vw-128 bg-zinc-500 ml-2"></div>
          </div>
        </div>
      )}

      {tab === "border-radius" && (
        <div>
          {borderRaduises.map(([rounded, vwRounded], idx) => (
            <div key={idx} className="flex items-center mt-4">
              <div className={`w-vw-16 h-vw-16 ${rounded} bg-green-500`}></div>
              <div className={`w-vw-16 h-vw-16 ${vwRounded} bg-zinc-500 ml-2`}></div>
            </div>
          ))}
        </div>
      )}

      {tab === "other" && (
        <div>
          <div className="w-vw-10 h-vw-10 bg-red-400"></div>
          <div className="w-vw-10 h-vw-10 bg-red-400 -ml-vw-0.5"></div>
        </div>
      )}
    </div>
  );
}

export default App;
