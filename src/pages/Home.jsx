import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [materials, setMaterials] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    subject: "",
    type: "",
    year: "",
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/materials/`)
      .then(res => {
        setMaterials(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let result = materials;

    // Filter by search
    if (search) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply each filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => item[key]?.toLowerCase() === value.toLowerCase());
      }
    });

    setFiltered(result);
  }, [search, filters, materials]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 Browse Materials</h2>

      {/* 🔍 Search + Filters */}
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={filters.course}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={filters.subject}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Type (notes, paper...)"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {/* 📄 Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map(mat => (
            <div key={mat._id} className="p-4 rounded-xl shadow bg-white">
              <h3 className="font-semibold text-lg">{mat.title}</h3>
              <p>{mat.course} | {mat.subject}</p>
              <p className="text-sm text-gray-600">{mat.type} ({mat.year})</p>
              <a
                href={`http://localhost:5000/${mat.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 underline"
              >
                View / Download
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No materials found.</p>
        )}
      </div>
    </div>
  );
}
