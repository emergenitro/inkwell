'use client';
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const getWidthOfInput = () => {
      const tmp = document.createElement("span");
      tmp.className = inputRef.current.className;
      tmp.style.visibility = "hidden";
      tmp.style.position = "absolute";
      tmp.style.whiteSpace = "pre";
      
      const text = name || "stranger";
      tmp.textContent = text;
      
      document.body.appendChild(tmp);
      const theWidth = tmp.getBoundingClientRect().width;
      document.body.removeChild(tmp);
      
      return theWidth;
    };

    const width = getWidthOfInput();
    inputRef.current.style.width = `${width + 30}px`;
  }, [name]);

  return (
    <div className="flex min-h-screen items-center justify-center font-fraunces text-white bg-gradient-to-br from-slate-900 to-slate-950">
      <h1 className="text-6xl font-normal">
        Hey{" "}
        <input 
          ref={inputRef}
          type="text" 
          placeholder="stranger" 
          className="bg-transparent border-b-2 border-white/0 focus:border-white/80 outline-none text-center transition-all duration-200 placeholder:text-white/40 placeholder:font-light p-0 m-0 text-6xl font-fraunces" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        !
      </h1>
    </div>
  );
}