import "./ProfilePage.css";

export default function ProfilePage() {
  // Replace this with dynamic user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    employeeId: "EMP12345",
  };

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Employee ID:</strong> {user.employeeId}</p>
      </div>
    </div>
  );
}
