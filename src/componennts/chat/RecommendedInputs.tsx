interface Props {
  onSelect: (message: string) => void;
  disableAll?: boolean; // <-- optional
}

const suggestions = [
  "Generate Mismatch Report",
  "Generate Leave Report",
  "Generate Mismatch Chart",
  "Show Employees",
  "Ask HR",
];

export default function RecommendedInputs({ onSelect, disableAll = false }: Props) {
  return (
    <div className="recommended-inputs">
      {suggestions.map((msg) => (
        <button
          key={msg}
          className="suggestion-button"
          onClick={() => onSelect(msg)}
          disabled={disableAll && msg !== "Ask HR"} // <-- disable all except "Ask HR"
        >
          {msg}
        </button>
      ))}
    </div>
  );
}
