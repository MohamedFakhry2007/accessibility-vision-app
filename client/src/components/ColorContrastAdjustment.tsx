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

  useEffect(() => {
    fetchSavedSchemes();
  }, []);

  const fetchSavedSchemes = async () => {
    try {
      const response = await axios.get('/api/colorschemes');
      setSavedSchemes(response.data);
    } catch (error) {
      console.error('Error fetching color schemes:', error);
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
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
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
        />
        <button onClick={handleSaveScheme}>Save Scheme</button>
      </div>
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
    </div>
  );
};

export default ColorContrastAdjustment;