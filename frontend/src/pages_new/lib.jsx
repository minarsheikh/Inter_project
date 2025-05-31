import { useEffect, useState } from 'react';
import axios from 'axios';

function Library() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/documents/")
      .then(res => setDocuments(res.data))
      .catch(() => setDocuments([]));
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map(doc => (
            <li key={doc.id} className="border rounded p-4">
              <p><strong>Title:</strong> {doc.title}</p>
              <p><strong>Status:</strong> {doc.status}</p>
              <p><strong>Uploaded At:</strong> {new Date(doc.uploaded_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Library;
