import { Message } from "../../types/message";
import ReactMarkdown from "react-markdown";
import "./ChatBubbel.css";
import HtmlRenderer from "componennts/chart/HTMLRender";
const dummyData = [
  {
    employeeId: "EMP0045",
    employeeName: "Employee_45",
    discrepancyDate: "2025-07-11",
    issue: "Absent without approved leave",
    department: "OPT",
  },
];
export default function ChatBubble({ role, text }: Message) {

const isHtml = text.trim().startsWith("<!DOCTYPE html>") || text.includes("<html");

  return (
    <div className={`chat-bubble ${role}`}>
    {isHtml ? (
      <HtmlRenderer htmlContent={text} />
    ) : (
      <span>{text}</span>
    )}
  </div>
  // <div>
  //    <span>{text}</span>
  // </div>
  );
}
