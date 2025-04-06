import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadMaterial() {
  const [form, setForm] = useState({
    title: "",
    course: "",
    subject: "",
    type: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMsg("");

    const token = localStorage.getItem("token");
    if (!token) return navigate("/admin/login");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/materials/upload", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("✅ File uploaded successfully!");
      setForm({ title: "", course: "", subject: "", type: "", year: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed. Please check your data.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Material</h2>
      {msg && <p className="mb-4 text-center">{msg}</p>}
      <form onSubmit={handleUpload} className="space-y-4">
        {["title", "course", "subject", "type", "year"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
