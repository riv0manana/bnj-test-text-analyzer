import { useState, useEffect } from "react";

const API_URL = import.meta.env.PROD ? "/api" : "http://localhost:3000/api";

export type Analysis = {
  id: number;
  text: string;
  score: number;
  createdAt: string;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
  score?: number;
};

export function useTextAnalyzer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const analyzeText = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/analyzer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage.content }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMessage: Message = {
          role: "assistant",
          content: `Analysis complete. Score: ${data.score}`,
          score: data.score,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        fetchHistory(); // Refresh history
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error analyzing text." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    history,
    loading,
    analyzeText,
  };
}
