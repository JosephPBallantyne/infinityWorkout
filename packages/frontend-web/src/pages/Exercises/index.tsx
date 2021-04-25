import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ExerciseTable from './ExerciseTable';
import { ExerciseCardData } from '../../types/exercise.type';
import { WorkoutCardData } from '../../types/workout.type';
import { Plus } from '../../utils/icons';
import { ApiContext } from '../../contexts/apiContextProvider';

const CreateExercise = styled.button`
  position: fixed;
  bottom: 60px;
  right: 60px;
  border-radius: 50%;
  border: 0;
  background-color: ${(props) => props.theme.color.twitter.blue};
  height: ${(props) => props.theme.icon.size.xxlarge};
  width: ${(props) => props.theme.icon.size.xxlarge};
  box-shadow: ${(props) => props.theme.shadow.f};
`;

const Exercises: React.FunctionComponent = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseCardData[]>();
  const [workoutData, setWorkoutData] = useState<WorkoutCardData[]>();
  const apiService = useContext(ApiContext);

  const getStaticData = useCallback(async () => {
    try {
      const exercises = await apiService.get('/exercises/cards');
      setExerciseData(exercises.data);
      const workouts = await apiService.get('/workouts/user');
      return setWorkoutData(workouts);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService]);

  useEffect(() => {
    getStaticData();
  }, [getStaticData]);

  return (
    <>
      {exerciseData && (
        <ExerciseTable data={exerciseData} workouts={workoutData} />
      )}
      <Link to="/exercise" style={{ textDecoration: 'none' }}>
        <CreateExercise type="button">
          <Plus />
        </CreateExercise>
      </Link>
    </>
  );
};

export default Exercises;
