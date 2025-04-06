import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">📚 Exam Materials</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/admin/login" className="hover:underline">Admin</Link>
      </div>
    </nav>
  );
}
