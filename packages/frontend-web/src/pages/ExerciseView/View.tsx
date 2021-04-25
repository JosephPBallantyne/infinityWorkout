import React from 'react';
import styled from 'styled-components';
import { ExerciseViewData } from '../../types/exercise.type';

interface Data {
  data: ExerciseViewData;
}

const View = ({ data }: Data) => {
  const muscleGroups = data.muscleGroups.map((group: any) => {
    const muscles = group.muscles.map((muscle: any) => {
      return (
        <div>
          {muscle.name} {muscle.head}
        </div>
      );
    });
    return (
      <div>
        {group.name}
        {muscles}
      </div>
    );
  });
  return (
    <>
      <div>
        {data.user.username} - {data.createdAt}
      </div>
      <div>{data.name}</div>
      {muscleGroups}
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
    </>
  );
};

export default View;
