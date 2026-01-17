import React from 'react';
import './InstagramFeed.css';

const instagramPosts = [
  { id: 1, img: 'https://scontent.cdninstagram.com/v/t51.82787-15/565020406_18155824342402036_6419624417023794957_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=110&ig_cache_key=Mzc0NDkxMjY1MzY0ODEwMTk3Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyNzl4MTUxNS5zZHIuQzMifQ%3D%3D&_nc_ohc=960HvDq9AkgQ7kNvwHoIvCS&_nc_oc=AdnABGozV9Fm2ReOYKsnnrkgvqb6DF4UtXpOSq1CEVHaVGdY8tEpiLKV0_AMKPVVXtLfx2cnAcurTJxH-d-fOcbB&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=EFUoS0qf5CT3jFCfUN9FDg&oh=00_Aff7vUhx6lrybaf_pWKBwDO1q5yOtzL1w5oCy9yDSy1QIg&oe=68F72841', url: 'https://www.instagram.com/p/DP4mjeTj4JV/' },
  { id: 2, img: 'https://placehold.co/280x280?text=IG+Post+2', url: 'https://www.instagram.com/p/C29d_7_A_aL/' },
  { id: 3, img: 'https://placehold.co/280x280?text=IG+Post+3', url: 'https://www.instagram.com/p/C28s_rqg_q3/' },
  { id: 4, img: 'https://placehold.co/280x280?text=IG+Post+4', url: 'https://www.instagram.com/p/C27b_7_g_qZ/' },
  { id: 5, img: 'https://placehold.co/280x280?text=IG+Post+5', url: 'https://www.instagram.com/p/C26e_7_g_qY/' },
  { id: 6, img: 'https://placehold.co/280x280?text=IG+Post+6', url: 'https://www.instagram.com/p/C25d_7_g_qZ/' },
];


const InstagramFeed = () => {
  return (
    <section className="instagram-feed-section">
      <h2 className="section-title">Latest on Instagram</h2>
      <div className="instagram-grid">
        {instagramPosts.map(post => (
          <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="instagram-post-link">
            <img src={post.img} alt={`Instagram post ${post.id}`} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;