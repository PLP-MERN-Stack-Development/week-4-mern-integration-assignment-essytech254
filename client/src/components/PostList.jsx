import { useEffect, useState } from 'react';
import { postService, categoryService } from '../services/api';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await postService.getAllPosts(1, 10, selectedCategory);
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Could not fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Posts</h2>

      {/* Filter Dropdown */}
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        className="border p-2 my-2"
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : (
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map(post => (
              <div key={post._id} className="border rounded-lg p-4 shadow bg-white">
                {/* Featured Image */}
                {post.image && (
                  <img
                    src={import.meta.env.VITE_API_URL + post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}

                {/* Post Content */}
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Read More
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
