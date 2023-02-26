import { useState } from 'react';
import './App.css';


function App() {
  const [tab, setTab] = useState('font-size');
  const fontSizes = [
    ['text-xs', 'text-vw-xxs'],
    ['text-xs', 'text-vw-xs'],
    ['text-sm', 'text-vw-sm'],
    ['text-base', 'text-vw-base'],
    ['text-lg', 'text-vw-lg'],
    ['text-xl', 'text-vw-xl'],
    ['text-2xl', 'text-vw-2xl'],
    ['text-3xl', 'text-vw-3xl'],
    ['text-4xl', 'text-vw-4xl'],
    ['text-5xl', 'text-vw-5xl'],
    ['text-6xl', 'text-vw-6xl'],
    ['text-7xl', 'text-vw-7xl'],
    ['text-8xl', 'text-vw-8xl'],
    ['text-9xl', 'text-vw-9xl'],
  ];
  const spacings = [
    ['w-1', 'h-1', 'w-vw-1', 'h-vw-1'],
    ['w-2', 'h-2', 'w-vw-2', 'h-vw-2'],
    ['w-3', 'h-3', 'w-vw-3', 'h-vw-3'],
    ['w-4', 'h-4', 'w-vw-4', 'h-vw-4'],
    ['w-4.5', 'h-4.5', 'w-vw-4.5', 'h-vw-4.5'],
    ['w-5', 'h-5', 'w-vw-5', 'h-vw-5'],
    ['w-6', 'h-6', 'w-vw-6', 'h-vw-6'],
    ['w-7', 'h-7', 'w-vw-7', 'h-vw-7'],
    ['w-8', 'h-8', 'w-vw-8', 'h-vw-8'],
    ['w-9', 'h-9', 'w-vw-9', 'h-vw-9'],
    ['w-10', 'h-10', 'w-vw-10', 'h-vw-10'],
    ['w-11', 'h-11', 'w-vw-11', 'h-vw-11'],
    ['w-12', 'h-12', 'w-vw-12', 'h-vw-12'],
    ['w-14', 'h-14', 'w-vw-14', 'h-vw-14'],
    ['w-16', 'h-16', 'w-vw-16', 'h-vw-16'],
    ['w-18', 'h-18', 'w-vw-18', 'h-vw-18'],
    ['w-20', 'h-20', 'w-vw-20', 'h-vw-20'],
    ['w-24', 'h-24', 'w-vw-24', 'h-vw-24'],
    ['w-28', 'h-28', 'w-vw-28', 'h-vw-28'],
    ['w-32', 'h-32', 'w-vw-32', 'h-vw-32'],
    ['w-36', 'h-36', 'w-vw-36', 'h-vw-36'],
    ['w-40', 'h-40', 'w-vw-40', 'h-vw-40'],
    ['w-44', 'h-44', 'w-vw-44', 'h-vw-44'],
    ['w-48', 'h-48', 'w-vw-48', 'h-vw-48'],
    ['w-52', 'h-52', 'w-vw-52', 'h-vw-52'],
    ['w-56', 'h-56', 'w-vw-56', 'h-vw-56'],
    ['w-60', 'h-60', 'w-vw-60', 'h-vw-60'],
    ['w-64', 'h-64', 'w-vw-64', 'h-vw-64'],
    ['w-72', 'h-72', 'w-vw-72', 'h-vw-72'],
    ['w-80', 'h-80', 'w-vw-80', 'h-vw-80'],
    ['w-96', 'h-96', 'w-vw-96', 'h-vw-96'],
  ]
  const borderRaduises = [
    ['rounded-sm', 'rounded-vw-sm'],
    ['rounded', 'rounded-vw'],
    ['rounded-md', 'rounded-vw-md'],
    ['rounded-lg', 'rounded-vw-lg'],
    ['rounded-xl', 'rounded-vw-xl'],
    ['rounded-2xl', 'rounded-vw-2xl'],
    ['rounded-3xl', 'rounded-vw-3xl'],
    ['rounded-4xl', 'rounded-vw-4xl']
  ]

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button type="button" className="p-2 bg-zinc-200" onClick={() => setTab('font-size')}>font sizes</button>
        <button type="button" className="p-2 ml-2 bg-zinc-200" onClick={() => setTab('spacing')}>spacing</button>
        <button type="button" className="p-2 ml-2 bg-zinc-200" onClick={() => setTab('border-radius')}>border raduis</button>
      </div>

      {tab === 'font-size' && (
        <div>
          {fontSizes.map(([size, vwSize], idx) => (
            <div key={idx} className="flex flex-col mt-4 font-mono whitespace-nowrap">
              <p className={size}>Normal spacing</p>
              <p className={`${vwSize} mt-2`}>Fluid spacing!</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'spacing' && (
        <div>
          {spacings.map(([w, h, vwW, vwH], idx) => (
            <div key={idx} className="flex items-center mt-4">
              <div className={`${w} ${h} bg-green-500`}></div>
              <div className={`${vwW} ${vwH} bg-zinc-500 ml-2`}></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'border-radius' && (
        <div>
          {borderRaduises.map(([rounded, vwRounded], idx) => (
            <div key={idx} className="flex items-center mt-4">
              <div className={`w-vw-16 h-vw-16 ${rounded} bg-green-500`}></div>
              <div className={`w-vw-16 h-vw-16 ${vwRounded} bg-zinc-500 ml-2`}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
