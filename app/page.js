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
  }, [name, loading]);

  useEffect(() => {
    if (!code) return;
    document.title = `${name || "stranger"}'s Journal`;

    fetch(`/api/journal/${code}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [code, loading]);

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

  const handleOnClick = () => {
    alert("saving entries is not implemented yet!");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center font-fraunces text-white bg-gradient-to-br from-slate-900 to-slate-950">
        <h1 className="text-2xl font-normal animate-pulse">loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center items-center mx-auto font-fraunces text-white bg-gradient-to-br from-slate-900 to-slate-950 flex-col text-center w-8/10">
      <main className="flex-1 mt-10 w-full">
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
            onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
          />
          !
        </h1>
        <div className="relative h-6 mt-4">
          <p className={`absolute inset-0 text-center text-white/60 transition-opacity duration-500 ${code ? 'opacity-0' : 'opacity-100'}`}>
            type your name above to create your private journal.
          </p>
          <p className={`absolute inset-0 text-center text-white/60 transition-opacity duration-500 ${code ? 'opacity-100' : 'opacity-0'}`}>
            your journal is ready!
          </p>
        </div>
        { code && (
          <div className="text-left mt-6 text-white/60 mx-auto">
            <input type="text" placeholder="title..." className="mt-10 bg-transparent border-b-2 border-white/20 focus:border-white/80 outline-none transition-all duration-200 placeholder:text-white/40 placeholder:font-light p-0 m-0 text-lg font-fraunces w-full"></input>
            <textarea placeholder="your thoughts..." className="mt-6 bg-transparent border-b-2 border-white/20 focus:border-white/80 outline-none transition-all duration-200 placeholder:text-white/40 placeholder:font-light m-0 text-md font-fraunces w-full h-48 resize-none"></textarea>
            <div className="flex justify-end mt-4">
              <button className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white/80 font-fraunces px-4 py-2 rounded-md hover:cursor-pointer" onClick={handleOnClick}>
                save entry
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="mb-4 text-sm text-white/40">
        {code && (
          <p className="text-sm text-white/50">
            your code: <span className="text-white/80 font-mono">{code}</span>
          </p>
        )}
        <p>got a code already? <input type="text" placeholder="enter here" className="bg-transparent border-b-2 border-white/0 focus:border-white/80 outline-none text-center transition-all duration-200 placeholder:text-white/40 placeholder:font-light p-0 m-0 text-sm font-fraunces"></input></p>
        your private journal. no accounts. no passwords.
      </footer>
    </div>
  );
}
