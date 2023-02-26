import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'wouter';

import Home from './pages/Home';
import Site from './pages/Site';
import Detail from './pages/Detail';

import Header from './components/Header';
import ToggleSwitch from './components/ToggleSwitch';

import useTheme from './hooks/useTheme';

export default function App() {
  const [theme, changeTheme] = useTheme();
  return (
    <div className={`App ${theme ? 'mode' : ''}`}>
      <Header />
      <ToggleSwitch theme={theme} changeTheme={changeTheme} />
      <Route path="/" component={Home} />
      <Route component={Detail} path="/:section/card/:id" />
      <Route component={Site} path="/:section" />
      <Route component={Site} path="/:section/:name" />
    </div>
  );
}
