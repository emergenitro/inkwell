'use client';
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setName(data.name);
          setCode(data.code);
        }
      })
      .finally(() => setLoading(false));
  }, []);

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
    inputRef.current.style.width = `calc(${width}px + 0.75ch)`;
  }, [name]);

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnBlur = async () => {
    if (!name.trim()) return;

    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    const data = await res.json();
    if (data.code) setCode(data.code);

  };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center font-fraunces text-white bg-gradient-to-br from-slate-900 to-slate-950">
        <h1 className="text-2xl font-normal animate-pulse">loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center font-fraunces text-white bg-gradient-to-br from-slate-900 to-slate-950">
      <h1 className="text-2xl font-normal">
        hey{" "}
        <input
          ref={inputRef}
          type="text"
          placeholder={code ? name : "stranger"}
          className="bg-transparent border-b-2 border-white/0 focus:border-white/80 outline-none text-center transition-all duration-200 placeholder:text-white/40 placeholder:font-light p-0 m-0 text-2xl font-fraunces"
          name="name"
          maxLength={20}
          value={name}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        !
      </h1>
      {code && (
        <p className="text-sm text-white/50">
          your code: <span className="text-white/80 font-mono">{code}</span>
        </p>
      )}
    </div>
  );
}
