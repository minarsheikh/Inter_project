import React, { useState } from "react";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer(data.response); // make sure to match 'response' not 'answer'
      } else {
        setAnswer("Error: " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      setAnswer("Network error");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          className="border p-2 w-80"
          required
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Answer:</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default Chat;
