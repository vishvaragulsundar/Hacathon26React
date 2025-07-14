import { useState } from "react";
import './ChatInput.css'
interface Props {
    onSend: (message: string) => void;
  }
  
  export default function ChatInput({ onSend }: Props) {
    const [input, setInput] = useState("");
  
    const handleSend = () => {
      if (!input.trim()) return;
      onSend(input.trim());
      setInput("");
    };
  
    return (
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  }
  