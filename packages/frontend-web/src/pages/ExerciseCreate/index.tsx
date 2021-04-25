import React, { useEffect, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../contexts/apiContextProvider';
import Form from './Form';
import { StaticExerciseData } from '../../types/exercise.type';

const Title = styled.div`
  color: ${(props) => props.theme.color.grey.a};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.d};
  padding-top: ${(props) => props.theme.spacing.f};
  padding-bottom: ${(props) => props.theme.spacing.f};
`;

const ExerciseCreate: React.FunctionComponent = () => {
  const [staticData, setStaticData] = useState<StaticExerciseData>();
  const apiService = useContext(ApiContext);

  const getStaticData = useCallback(async () => {
    try {
      const data = await apiService.get('/exercises/options');
      console.log(data);
      return setStaticData(data.data);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService]);

  useEffect(() => {
    getStaticData();
  }, [getStaticData]);

  return (
    <div>
      <Title>Create Exercise</Title>
      {staticData && <Form staticData={staticData} />}
    </div>
  );
};

export default ExerciseCreate;
