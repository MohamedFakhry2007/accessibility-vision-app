// client/src/components/VisualImpairmentSimulator.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface VisualImpairment {
  _id: string;
  name: string;
  description: string;
  cssFilters: string;
}

const VisualImpairmentSimulator: React.FC = () => {
  const [impairments, setImpairments] = useState<VisualImpairment[]>([]);
  const [selectedImpairment, setSelectedImpairment] = useState<VisualImpairment | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchImpairments();
  }, []);

  const fetchImpairments = async () => {
    try {
      const response = await axios.get('/api/visual-impairments');
      setImpairments(response.data);
    } catch (error) {
      console.error('Error fetching visual impairments:', error);
    }
  };

  const handleImpairmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = impairments.find(imp => imp._id === event.target.value);
    setSelectedImpairment(selected || null);
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="visual-impairment-simulator">
      <h2>Visual Impairment Simulator</h2>
      <div className="controls">
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
        />
        <select onChange={handleImpairmentChange}>
          <option value="">Select an impairment</option>
          {impairments.map(imp => (
            <option key={imp._id} value={imp._id}>{imp.name}</option>
          ))}
        </select>
      </div>
      {selectedImpairment && (
        <div className="impairment-info">
          <h3>{selectedImpairment.name}</h3>
          <p>{selectedImpairment.description}</p>
        </div>
      )}
      <div className="image-preview">
        <div className="original">
          <h4>Original Image</h4>
          {imageUrl && <img src={imageUrl} alt="Original" />}
        </div>
        <div className="simulated">
          <h4>Simulated View</h4>
          {imageUrl && selectedImpairment && (
            <img
              src={imageUrl}
              alt={`Simulated - ${selectedImpairment.name}`}
              style={{ filter: selectedImpairment.cssFilters }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualImpairmentSimulator;