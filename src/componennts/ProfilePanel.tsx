import "./ProfilePanel.css";

export default function ProfilePanel({ onClose }: { onClose: () => void }) {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    employeeId: "EMP12345",
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div
        className="profile-panel"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3>👤 Profile</h3>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Employee ID:</strong> {user.employeeId}</p>
        </div>
      </div>
    </div>
  );
}
