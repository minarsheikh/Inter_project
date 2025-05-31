import { useState } from "react";

function Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askOpenAI = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      // Verify the API key is loaded
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is not configured");
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get response from OpenAI");
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Received empty response from OpenAI");
      }

      setAnswer(data.choices[0].message.content);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Error communicating with OpenAI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          setError(null);
        }}
        placeholder="Type your question..."
        className="border p-2 w-full mb-2"
      />
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <button
        onClick={askOpenAI}
        disabled={loading}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:bg-green-400"
      >
        {loading ? "Loading..." : "Ask"}
      </button>
      {answer && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Answer:</strong> {answer}</p>
        </div>
      )}
    </div>
  );
}

export default Ask;