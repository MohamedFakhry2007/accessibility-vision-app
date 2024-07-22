// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ColorContrastAdjustment from './components/ColorContrastAdjustment';
import VisualImpairmentSimulator from './components/VisualImpairmentSimulator';
import GuidesAndBestPractices from './components/GuidesAndBestPractices';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/color-contrast" component={ColorContrastAdjustment} />
          <Route path="/visual-impairment" component={VisualImpairmentSimulator} />
          <Route path="/guides" component={GuidesAndBestPractices} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;