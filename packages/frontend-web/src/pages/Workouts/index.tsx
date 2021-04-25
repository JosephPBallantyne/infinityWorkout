import React, { useEffect, useContext, useState, useCallback } from 'react';
import Form from './Form';
import Table from './Table';
import { ApiContext } from '../../contexts/apiContextProvider';
import { WorkoutCardData } from '../../types/workout.type';

const Workout: React.FunctionComponent = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutCardData[]>();
  const apiService = useContext(ApiContext);

  const getWorkoutData = useCallback(async () => {
    try {
      const data = await apiService.get('/workouts');
      return setWorkoutData(data.data);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService]);

  useEffect(() => {
    getWorkoutData();
  }, [getWorkoutData]);

  return (
    <div>
      <Form />
      {workoutData && <Table data={workoutData} />}
    </div>
  );
};

export default Workout;
