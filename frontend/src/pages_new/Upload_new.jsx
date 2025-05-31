import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Please select a file.");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:8000/api/upload/", formData);
      alert("Upload successful");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Upload a Document</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 w-full" />
      <button
        onClick={uploadFile}
        disabled={uploading}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default Upload;
