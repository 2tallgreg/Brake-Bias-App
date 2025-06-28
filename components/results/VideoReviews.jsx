// components/results/VideoReviews.jsx
import React from 'react';

export default function VideoReviews({ videos }) {
  // If the video array is undefined or empty, render a helpful diagnostic message.
  if (!videos || videos.length === 0) {
    return (
        <div className="video-reviews-section">
            <h2 className="section-title">Video Reviews</h2>
            <div className="video-fallback-card">
                <h3>Videos Unavailable</h3>
                <p>Could not fetch video reviews. This is usually due to a missing or invalid YouTube API key.</p>
                <p>Please check the server logs and ensure <strong>YOUTUBE_API_KEY</strong> is set correctly in your <strong>.env.local</strong> file.</p>
            </div>
             <style jsx>{`
                .video-reviews-section { margin-top: 2rem; }
                .section-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.5rem; }
                .video-fallback-card { background-color: var(--bg-secondary); border: 1px solid var(--border); border-left: 4px solid var(--warning); border-radius: 12px; padding: 1.5rem; }
                .video-fallback-card h3 { color: var(--warning); margin-bottom: 0.5rem; }
                .video-fallback-card p { color: var(--text-secondary); }
                .video-fallback-card p:last-child { margin-bottom: 0; }
            `}</style>
        </div>
    );
  }

  return (
    <div className="video-reviews-section">
      <h2 className="section-title">Video Reviews</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="thumbnail-link">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="video-thumbnail"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/480x360/1A1A1A/FFFFFF?text=Video+Not+Found'; }}
              />
               <div className="play-icon-wrapper">
                    <div className="play-icon">▶</div>
               </div>
            </a>
            <div className="video-info">
                <h3 className="video-title">
                    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                        {video.title}
                    </a>
                </h3>
                <p className="video-channel">{video.channel}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .video-reviews-section { margin-top: 2rem; }
        .section-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary); border-bottom: 2px solid var(--primary); padding-bottom: 0.5rem; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .video-card { background-color: var(--bg-secondary); border-radius: 12px; overflow: hidden; border: 1px solid var(--border); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; flex-direction: column; }
        .video-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px var(--shadow); }
        .thumbnail-link { display: block; position: relative; background-color: var(--bg-tertiary); }
        .video-thumbnail { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; border-bottom: 1px solid var(--border); }
        .play-icon-wrapper { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.3); opacity: 0; transition: opacity 0.2s ease; }
        .thumbnail-link:hover .play-icon-wrapper { opacity: 1; }
        .play-icon { font-size: 2rem; color: white; background-color: rgba(0, 0, 0, 0.6); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; padding-left: 5px; }
        .video-info { padding: 1rem; flex-grow: 1; }
        .video-title { font-size: 1rem; font-weight: 600; margin: 0 0 0.25rem; line-height: 1.4; }
        .video-title a { color: var(--text-primary); text-decoration: none; }
        .video-title a:hover { text-decoration: underline; }
        .video-channel { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
      `}</style>
    </div>
  );
}