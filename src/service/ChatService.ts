import axios from "axios";

function extractHtmlOnly(text: string): string {
  const match = text.match(/```html\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : text.trim();
}

export async function sendMessageToBot(message: string) {
  try {
    const response = await axios.post("https://my-springboot-app2-1075036234285.us-central1.run.app/chat", {
      message,
    });

    
    const reply = response?.data.candidates?.[0]?.content?.parts?.[0]?.text;
    // console.log(reply,'check reply',response.data);
    if(reply===undefined){  
      return response.data;
    }
    // const htmlMatch = reply.match(/```html\s*([\s\S]*?)```/);
    const htmlMatch = reply.match(/```html\s*([\s\S]*?)```/)?.[1]?.trim() 
    const cleanHtml = extractHtmlOnly(reply);
    if (cleanHtml ) {
     return cleanHtml.trim();
    }
    return reply; // assuming { reply: "..." } from backend
  } catch (error) {
    console.error("Error sending message to backend:", error);
    return "⚠️ Failed to get response from bot.";
  }
} 


export async function fetchPolicyAnswer(question: string): Promise<string> {
  try {
    const response = await axios.get("https://my-springboot-app2-1075036234285.us-central1.run.app/api/policy/ask", {
      params: { question },
    });
    return  response.data?.candidates?.[0]?.content?.parts?.[0]?.text; // adjust if API returns `{ answer: "..." }`
  } catch (error: any) {
    // console.error("Error fetching policy answer:", error);
    return "Error fetching policy answer:";
  }
}

