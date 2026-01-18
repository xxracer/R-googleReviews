import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstagramFeed.css';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const newPosts = [];
      const imageIds = [1, 2, 3, 4, 5, 6];

      for (const id of imageIds) {
        try {
          const response = await axios.get(`/api/content/instagram_image_${id}`);
          if (response.data && response.data.content_value) {
            // Parse if it's JSON (sometimes ImageEditor saves as JSON with coords), or use raw string
            let imageUrl = response.data.content_value;
            let postLink = '#';
            try {
              const parsed = JSON.parse(imageUrl);
              if (parsed.url) imageUrl = parsed.url;
              if (parsed.postLink) postLink = parsed.postLink;
            } catch (e) {
              // Not JSON, use as is
            }
            newPosts.push({ id, img: imageUrl, link: postLink });
          }
        } catch (error) {
          // Ignore missing images
        }
      }
      // If no posts found in DB, use placeholders so section doesn't disappear
      if (newPosts.length === 0) {
        const placeholders = [
          { id: 1, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
          { id: 2, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
          { id: 3, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
          { id: 4, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
          { id: 5, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
          { id: 6, img: 'https://placehold.co/280x280?text=Upload+via+CMS', url: '#' },
        ];
        setPosts(placeholders);
      } else {
        setPosts(newPosts);
      }
    };

    fetchImages();
  }, []);

  // if (posts.length === 0) return null; // Removed check so it always renders

  return (
    <section className="instagram-feed-section">
      <h2 className="section-title">Latest on Instagram</h2>
      <div className="instagram-grid">
        {posts.map(post => (
          <div key={post.id} className="instagram-post-wrapper">
            {post.link && post.link !== '#' ? (
              <iframe
                className="instagram-embed-iframe"
                title={`Instagram Post ${post.id}`}
                src={`${post.link.split('?')[0]}embed`}
                frameBorder="0"
                scrolling="no"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            ) : (
              <div className="instagram-post-link">
                <img src={post.img} alt={`Instagram post ${post.id}`} />
                <div className="image-overlay">Link Needed</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;