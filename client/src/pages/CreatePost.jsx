import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) formData.append('image', image);

      const token = localStorage.getItem('token');

      await axios.post(
        import.meta.env.VITE_API_URL + '/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Post with Image</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full"
          rows={5}
        />
        \<select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border p-2 w-full"
>
            <option value="">Select Category</option>
            {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        {/* 📷 Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
