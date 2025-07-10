import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
      {post.category && (
        <p className="mt-2 text-sm text-blue-500">Category: {post.category.name}</p>
      )}
    </div>
  );
};

export default ViewPost;
