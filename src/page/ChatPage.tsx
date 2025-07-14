import { useEffect, useRef, useState } from "react";
import { Message } from "../types/message";
import ChatBubble from "../componennts/chat/ChatBubbel";
import ChatInput from "../componennts/chat/ChatInput";
import RecommendedInputs from "componennts/chat/RecommendedInputs";
import { sendMessageToBot } from "service/ChatService";

type Pending = null | "needQuestion";


export default function ChatPage() {
  const MGRID="MGR9280"
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [pending, setPending] = useState<Pending>(null);

  /* ---------- scroll-to-bottom ---------- */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  /* ---------- helper to push messages ---------- */
  const push = (role: "user" | "bot", text: string) =>
    setMessages((prev) => [...prev, { id: Date.now(), role, text }]);

  /* ---------- main handler ---------- */
  const handleSend = async (text: string) => {
    push("user", text);

    /* 1️⃣  Was the bot waiting for an employee ID? */
    if (pending === "needQuestion") {
      setPending(null);
      push("bot", `Generating Answer for your question **${text}** …`);

      // placeholder while backend works
      const thinkingId = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: thinkingId, role: "bot", text: "🤖 Thinking…" },
      ]);
      // call backend with required prompt
      const reply = await sendMessageToBot(text);

      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      return;
    }

    /* 2️⃣  First-turn: user asks for a report */
    if (/ask\s+question/i.test(text)) {
      push("bot", "Sure — please provide the Question");
      setPending("needQuestion");
      return;
    }
    if("Discrepancy Summary".toLocaleLowerCase()===text.toLocaleLowerCase()){
      const thinkingId = Date.now();
      const reply = await sendMessageToBot(`Discrepancy Summary ${MGRID}`);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      
    }
    if("Generate Mismatch Chart".toLocaleLowerCase()===text.toLocaleLowerCase()){
      const thinkingId = Date.now();
      const reply = await sendMessageToBot(`Generate Mismatch Chart ${MGRID}`);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      
    }
    if("Show Discrepancies".toLocaleLowerCase()===text.toLocaleLowerCase()){
      const thinkingId = Date.now();
      const reply = await sendMessageToBot(`Show Discrepancies ${MGRID}`);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
    }
    if("Show Employees".toLocaleLowerCase()===text.toLocaleLowerCase()){
      const thinkingId = Date.now();
      const reply = await sendMessageToBot(`Show Employees ${MGRID}`);
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
      );
      
    }

    /* 3️⃣  Normal flow: just relay to backend */
    const thinkingId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "bot", text: "🤖 Thinking…" },
    ]);
    const reply = await sendMessageToBot(text);
    setMessages((prev) =>
      prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m)),
    );
  };

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
