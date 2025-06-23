// app/feed/page.jsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorMessage from '@/components/common/ErrorMessage';

function FeedPageContent() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filters, setFilters] = useState({ make: '', model: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const uniqueMakes = [...new Set(articles.map(a => a.make).filter(Boolean))].sort();

    useEffect(() => {
        setLoading(true);
        fetch('/api/rss-feed')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch the news feed.');
                return res.json();
            })
            .then(data => {
                setArticles(data);
                setFilteredArticles(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = articles;
        if (filters.make) {
            result = result.filter(a => a.make === filters.make);
        }
        if (filters.model) {
            result = result.filter(a => a.model.toLowerCase().includes(filters.model.toLowerCase()));
        }
        setFilteredArticles(result);
    }, [filters, articles]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // --- Pass the custom text prop here ---
    if (loading) return <LoadingScreen text="Topping 'er off..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="feed-container">
            <div className="feed-header">
                <h1>Latest Reviews</h1>
                <p>Fresh reviews from top automotive journalists.</p>
            </div>

            <div className="filters-bar">
                <select name="make" value={filters.make} onChange={handleFilterChange} className="filter-select">
                    <option value="">All Makes</option>
                    {uniqueMakes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>
                <input
                    type="text"
                    name="model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    placeholder="Filter by model..."
                    className="filter-input"
                />
            </div>

            <div className="articles-grid">
                {filteredArticles.length > 0 ? filteredArticles.map((article, index) => (
                    <a href={article.link} key={index} target="_blank" rel="noopener noreferrer" className="article-card">
                        <h3>{article.title}</h3>
                        <p className="description">{article.description}...</p>
                        <div className="card-footer">
                            <span className="source">{article.source}</span>
                            <span className="date">{new Date(article.pubDate).toLocaleDateString()}</span>
                        </div>
                    </a>
                )) : (
                    <p>No reviews match your filters.</p>
                )}
            </div>

            <style jsx>{`
                .feed-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; }
                .feed-header { text-align: center; margin-bottom: 2rem; }
                .feed-header h1 { font-size: 2.5rem; color: var(--text-primary); }
                .feed-header p { font-size: 1.1rem; color: var(--text-secondary); }
                .filters-bar { display: flex; gap: 1rem; margin-bottom: 2rem; }
                .filter-select, .filter-input {
                    padding: 0.75rem;
                    border: 1px solid var(--border);
                    background-color: var(--bg-secondary);
                    color: var(--text-primary);
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .filter-input { flex-grow: 1; }
                .articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
                .article-card {
                    background-color: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 1.5rem;
                    text-decoration: none;
                    color: var(--text-primary);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .article-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px var(--shadow); text-decoration: none; }
                .article-card h3 { font-size: 1.2rem; margin: 0; }
                .description { color: var(--text-secondary); margin: 0; flex-grow: 1; }
                .card-footer { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-tertiary); border-top: 1px solid var(--border); padding-top: 1rem; }
            `}</style>
        </div>
    );
}

export default function FeedPage() {
    return (
        <Suspense fallback={<LoadingScreen text="Topping 'er off..." />}>
            <FeedPageContent />
        </Suspense>
    )
}