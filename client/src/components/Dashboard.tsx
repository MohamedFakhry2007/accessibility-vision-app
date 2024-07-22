// client/src/components/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ColorContrastAdjustment from './ColorContrastAdjustment';
import VisualImpairmentSimulator from './VisualImpairmentSimulator';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Accessibility Enhancement Dashboard</h1>
      <nav aria-label="Main Navigation">
        <ul>
          <li>
            <Link to="/color-contrast" aria-label="Go to Color and Contrast Adjustment">
              Color and Contrast Adjustment
            </Link>
          </li>
          <li>
            <Link to="/visual-impairment" aria-label="Go to Visual Impairment Simulator">
              Visual Impairment Simulator
            </Link>
          </li>
        </ul>
      </nav>
      <section aria-label="Dashboard Content">
        <h2>Quick Access Tools</h2>
        <ColorContrastAdjustment />
        <VisualImpairmentSimulator />
      </section>
    </div>
  );
};

export default Dashboard;