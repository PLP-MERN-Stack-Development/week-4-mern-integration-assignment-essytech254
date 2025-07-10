import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import PostList from './components/PostList';
import ViewPost from './pages/ViewPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Register from './pages/Register';

// Layout
import Navbar from './components/NavBar';

// Optional: ProtectedRoute if you want to secure some routes
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-3xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Example if using PrivateRoute:
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
