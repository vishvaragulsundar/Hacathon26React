import './RecommendedInputs.css'
interface Props {
    onSelect: (message: string) => void;
  }
  
  const suggestions = [
    "Generate Mismatch Report",
    "Generate Mismatch Chart",
    "Show Employees",
    "Ask Question"
  ];
  
  export default function RecommendedInputs({ onSelect }: Props) {
    return (
      <div className="recommended-inputs">
        {suggestions.map((msg, index) => (
          <button
            key={index}
            className="suggestion-button"
            onClick={() => onSelect(msg)}
          >
            {msg}
          </button>
        ))}
      </div>
    );
  }
  