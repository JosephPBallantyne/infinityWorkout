import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import View from './View';
import { ApiContext } from '../../contexts/apiContextProvider';
import { ExerciseViewData } from '../../types/exercise.type';

const ExerciseView: React.FunctionComponent = () => {
  const apiService = useContext(ApiContext);
  const [exerciseData, setExerciseData] = useState<ExerciseViewData>();
  const { id } = useParams<{ id: string }>();

  const getStaticData = useCallback(async () => {
    try {
      const data = await apiService.get(`/exercises/${id}`);
      return setExerciseData(data.data);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService]);

  useEffect(() => {
    getStaticData();
  }, [getStaticData]);

  return <>{exerciseData && <View data={exerciseData} />}</>;
};

export default ExerciseView;
