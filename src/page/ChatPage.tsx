import { useEffect, useRef, useState } from "react";
import { Message } from "../types/message";
import ChatBubble from "../componennts/chat/ChatBubbel";
import ChatInput from "../componennts/chat/ChatInput";
import RecommendedInputs from "componennts/chat/RecommendedInputs";
import { sendMessageToBot } from "service/ChatService";

type Pending = null | "needQuestion";

export default function ChatPage() {
  const MGRID = "MGR9280";

  /* ---------- state ---------- */
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [pending, setPending] = useState<Pending>(null);

  /* ---------- scrolling ---------- */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  /* ---------- unique numeric IDs ---------- */
  const seqRef = { current: Date.now() };
  const nextId = () => ++seqRef.current;

  /* ---------- helper to push & return id ---------- */
  const push = (role: "user" | "bot", text: string): number => {
    const id = nextId();
    setMessages((prev) => [...prev, { id, role, text }]);
    return id;
  };

  /* ---------- main handler ---------- */
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    /* 0️⃣ user message */
    push("user", text);

    /* 1️⃣ awaiting follow‑up question */
    if (pending === "needQuestion") {
      setPending(null);

      push("bot", `Generating Answer for your question **${text}** …`);
      const thinkingId = push("bot", "🤖 Thinking…");

      const reply = await sendMessageToBot(text);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      return;
    }

    /* 2️⃣ trigger “ask question” flow */
    if (/ask\s+question/i.test(text)) {
      push("bot", "Sure — please provide the Question");
      setPending("needQuestion");
      return;
    }

    /* 3️⃣ keyword shortcuts */
    const lower = text.toLowerCase();
    const keywordMap: Record<string, string> = {
      "discrepancy summary": `Discrepancy Summary ${MGRID}`,
      "generate mismatch chart": `Generate Mismatch Chart ${MGRID}`,
      "show discrepancies": `Show Discrepancies ${MGRID}`,
      "show employees": `Show Employees ${MGRID}`,
      
    };

    if (lower in keywordMap) {
      const thinkingId = push("bot", "🤖 Thinking…");
      const reply = await sendMessageToBot(keywordMap[lower]);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      return;
    }

    /* 4️⃣ default backend relay */
    const thinkingId = push("bot", "🤖 Thinking…");
    const reply = await sendMessageToBot(text);
    setMessages((prev) =>
      prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
    );
  };

  /* ---------- render ---------- */
  return (
    <>
      <div className="chat-messages" ref={scrollRef}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} {...msg} />
        ))}
      </div>

      <RecommendedInputs onSelect={handleSend} />
      <ChatInput onSend={handleSend} />
    </>
  );
}
