import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Admin Dashboard</h2>
      <div className="space-x-4">
        <Link to="/admin/upload" className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
          Upload Material
        </Link>
      </div>
    </div>
  );
}
