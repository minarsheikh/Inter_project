import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from './pages_new/Upload_new';
import Ask from './pages_new/Ask_new';
import Library from './pages_new/lib';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-4 mb-6">
          <nav className="container mx-auto flex justify-center space-x-6">
            <Link to="/" className="text-blue-600 hover:underline">Library</Link>
            <Link to="/upload" className="text-blue-600 hover:underline">Upload</Link>
            <Link to="/ask" className="text-blue-600 hover:underline">Ask</Link>
          </nav>
        </header>
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ask" element={<Ask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
