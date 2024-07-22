// client/src/components/ColorContrastAdjustment.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ColorScheme {
  _id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  contrastRatio: number;
}

const ColorContrastAdjustment: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [schemeName, setSchemeName] = useState('');
  const [contrastRatio, setContrastRatio] = useState(21);
  const [savedSchemes, setSavedSchemes] = useState<ColorScheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSavedSchemes();
  }, []);

  const fetchSavedSchemes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/colorschemes');
      setSavedSchemes(response.data);
    } catch (error) {
      console.error('Error fetching color schemes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateContrastRatio = (color1: string, color2: string): number => {
    // Implementation of contrast ratio calculation
    // (This should match the backend implementation)
    return 21; // Placeholder value
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
    setContrastRatio(calculateContrastRatio(e.target.value, textColor));
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
    setContrastRatio(calculateContrastRatio(backgroundColor, e.target.value));
  };

  const handleSaveScheme = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/colorschemes', {
        name: schemeName,
        backgroundColor,
        textColor,
      });
      setSavedSchemes([...savedSchemes, response.data]);
      setSchemeName('');
    } catch (error) {
      console.error('Error saving color scheme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSaveScheme();
    }
  };

  return (
    <div className="color-contrast-adjustment">
      <h2>Color and Contrast Adjustment</h2>
      <div className="color-inputs">
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            aria-label="Select background color"
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
            aria-label="Select text color"
          />
        </label>
      </div>
      <div className="preview" style={{ backgroundColor, color: textColor }}>
        Preview Text
      </div>
      <p>Contrast Ratio: {contrastRatio.toFixed(2)}</p>
      <div className="save-scheme">
        <input
          type="text"
          value={schemeName}
          onChange={(e) => setSchemeName(e.target.value)}
          placeholder="Scheme Name"
          aria-label="Enter scheme name"
        />
        <button 
          onClick={handleSaveScheme} 
          onKeyDown={handleKeyDown} 
          aria-label="Save color scheme"
        >
          Save Scheme
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="saved-schemes">
          <h3>Saved Color Schemes</h3>
          <ul>
            {savedSchemes.map((scheme) => (
              <li key={scheme._id}>
                {scheme.name} - Background: {scheme.backgroundColor}, Text: {scheme.textColor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorContrastAdjustment;