import React, { useState } from 'react'
import appwriteService from '../Appwrite/Configs'
import { Link } from 'react-router-dom'

function PostCard({ $id, slug, title, featuredImage, content }) {
  const [imageError, setImageError] = useState(false);
  const postSlug = slug || $id;
  const excerpt = typeof content === 'string'
    ? content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 120)
    : '';

  const imageSrc = appwriteService.getFileView(featuredImage) || appwriteService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${postSlug}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 h-full'>
        <div className='w-full justify-center mb-4'>
          {featuredImage && !imageError && imageSrc ? (
            <img
              src={imageSrc}
              alt={title || 'Post'}
              onError={() => setImageError(true)}
              className='rounded-xl w-full h-48 object-cover'
            />
          ) : (
            <div className='w-full h-48 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500'>No Image</div>
          )}
        </div>

        <h2 className='text-xl font-bold mb-2'>{title}</h2>
        {excerpt ? <p className='text-sm text-gray-700 line-clamp-3'>{excerpt}</p> : null}
      </div>
    </Link>
  )
}

export default PostCard
