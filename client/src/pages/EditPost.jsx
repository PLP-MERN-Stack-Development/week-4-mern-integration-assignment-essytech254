import React from 'react';
import { useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

const EditPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Post: {id}</h2>
      {/* Form with pre-filled data will go here in Task 4 */}
    </div>
  );
};

export default EditPost;
