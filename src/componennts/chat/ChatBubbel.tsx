import { Message } from "../../types/message";
import ReactMarkdown from "react-markdown";
import "./ChatBubbel.css";

export default function ChatBubble({ role, text }: Message) {
  return (
    <div className={`chat-bubble ${role}`}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
