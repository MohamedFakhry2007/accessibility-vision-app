// client/src/components/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ColorContrastAdjustment from './ColorContrastAdjustment';
import VisualImpairmentSimulator from './VisualImpairmentSimulator';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Accessibility Enhancement Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/color-contrast">Color and Contrast Adjustment</Link></li>
          <li><Link to="/visual-impairment">Visual Impairment Simulator</Link></li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <ColorContrastAdjustment />
        <VisualImpairmentSimulator />
      </div>
    </div>
  );
};

export default Dashboard;