import React, { useState } from "react";

const modes = [
  { value: "pitch", label: "Polished 1-minute pitch" },
  { value: "slides", label: "Slide outline (3–4 slides)" },
  { value: "feedback", label: "Quick feedback" },
];

function App() {
  const [idea, setIdea] = useState("");
  const [mode, setMode] = useState(modes[0].value);
  const [result, setResult] = useState("");

  const handlePolish = async () => {
    setResult("Processing...");
    const res = await fetch("http://localhost:8000/polish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, mode }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">PitchPolish AI Demo</h1>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={4}
          placeholder="Paste your rough idea here..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <select
          className="w-full border rounded p-2 mb-4"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          {modes.map((m) => (
            <option value={m.value} key={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          onClick={handlePolish}
        >
          Polish Idea
        </button>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <strong>Result:</strong>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;