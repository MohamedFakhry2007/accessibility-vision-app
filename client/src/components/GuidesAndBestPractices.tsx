// client/src/components/GuidesAndBestPractices.tsx
import React, { useState, useEffect } from 'react';
import { getGuides, createGuide, rateGuide } from '../services/guideService';

interface Guide {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: { _id: string; username: string };
  avgRating: number;
}

const GuidesAndBestPractices: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGuides();
  }, [selectedCategory, searchTerm]);

  const fetchGuides = async () => {
    try {
      const fetchedGuides = await getGuides(selectedCategory, searchTerm);
      setGuides(fetchedGuides);
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  };

  return (
    <div className="guides-and-best-practices">
      <h2>Guides and Best Practices</h2>
      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="color-contrast">Color Contrast</option>
          <option value="keyboard-navigation">Keyboard Navigation</option>
          <option value="screen-readers">Screen Readers</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search guides..."
        />
      </div>
      <div className="guide-list">
        {guides.map((guide) => (
          <GuideCard key={guide._id} guide={guide} />
        ))}
      </div>
      <CreateGuideForm onGuideCreated={fetchGuides} />
    </div>
  );
};

const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => {
  const [rating, setRating] = useState(0);

  const handleRate = async () => {
    try {
      await rateGuide(guide._id, rating);
      // Refetch the guide or update the local state
    } catch (error) {
      console.error('Error rating guide:', error);
    }
  };

  return (
    <div className="guide-card">
      <h3>{guide.title}</h3>
      <p>Category: {guide.category}</p>
      <p>Author: {guide.author.username}</p>
      <p>Average Rating: {guide.avgRating.toFixed(1)}</p>
      <div className="rating">
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button onClick={handleRate}>Rate</button>
      </div>
      <a href={`/guides/${guide._id}`}>Read More</a>
    </div>
  );
};

const CreateGuideForm: React.FC<{ onGuideCreated: () => void }> = ({ onGuideCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createGuide({ title, content, category });
      setTitle('');
      setContent('');
      setCategory('');
      onGuideCreated();
    } catch (error) {
      console.error('Error creating guide:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-guide-form">
      <h3>Create New Guide</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Guide Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Guide Content"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="color-contrast">Color Contrast</option>
        <option value="keyboard-navigation">Keyboard Navigation</option>
        <option value="screen-readers">Screen Readers</option>
      </select>
      <button type="submit">Create Guide</button>
    </form>
  );
};

export default GuidesAndBestPractices;