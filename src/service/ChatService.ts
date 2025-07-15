import axios from "axios";


export async function sendMessageToBot(message: string) {
  try {
    const response = await axios.post("http://localhost:8080/chat", {
      message,
    });

    
    const reply = response?.data.candidates?.[0]?.content?.parts?.[0]?.text;
    // console.log(reply,'check reply',response.data);
    if(reply===undefined){  
      return response.data;
    }
    // const htmlMatch = reply.match(/```html\s*([\s\S]*?)```/);
    const htmlMatch = reply.match(/```html\s*([\s\S]*?)```/)?.[1]?.trim() || "<p>No HTML found</p>";
    if (htmlMatch || htmlMatch[1]) {
     return htmlMatch.trim();
    }
    return reply; // assuming { reply: "..." } from backend
  } catch (error) {
    console.error("Error sending message to backend:", error);
    return "⚠️ Failed to get response from bot.";
  }
} 


export async function fetchPolicyAnswer(question: string): Promise<string> {
  try {
    const response = await axios.get("http://localhost:8080/api/policy/ask", {
      params: { question },
    });
    return  response.data?.candidates?.[0]?.content?.parts?.[0]?.text; // adjust if API returns `{ answer: "..." }`
  } catch (error: any) {
    // console.error("Error fetching policy answer:", error);
    return "Error fetching policy answer:";
  }
}

