import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Exercises,
  ExerciseCreate,
  ExerciseView,
  Login,
  SignUp,
  Workouts,
  WorkoutView,
} from './pages';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Route path="/" exact component={Exercises} />
        <Route path="/exercise" exact component={ExerciseCreate} />
        <Route path="/exercise/:id" exact component={ExerciseView} />
        <Route path="/workouts" exact component={Workouts} />
        <Route path="/workouts/:id" exact component={WorkoutView} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
