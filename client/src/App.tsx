// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ColorContrastAdjustment from './components/ColorContrastAdjustment';
import VisualImpairmentSimulator from './components/VisualImpairmentSimulator';
import GuidesAndBestPractices from './components/GuidesAndBestPractices';
import './styles/App.css';  // Importing the CSS file from the styles directory

const ErrorBoundary: React.FC = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  
  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="app-nav">
            <ul className="nav-list">
              <li className="nav-item"><a href="/">Dashboard</a></li>
              <li className="nav-item"><a href="/color-contrast">Color Contrast</a></li>
              <li className="nav-item"><a href="/visual-impairment">Visual Impairment</a></li>
              <li className="nav-item"><a href="/guides">Guides</a></li>
            </ul>
          </nav>
          <button className="nav-toggle">
            <span className="nav-toggle-icon"></span>
          </button>
        </header>
        <main className="app-main">
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/color-contrast" component={ColorContrastAdjustment} />
              <Route path="/visual-impairment" component={VisualImpairmentSimulator} />
              <Route path="/guides" component={GuidesAndBestPractices} />
            </Switch>
          </ErrorBoundary>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Your App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;