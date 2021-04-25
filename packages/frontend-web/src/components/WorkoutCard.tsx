import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WorkoutCardData } from '../types/workout.type';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: ${(props) => props.theme.spacing.l}; */
  width: 620px;
  /* box-shadow: ${(props) => props.theme.shadow.a};
  box-shadow: ${(props) => props.theme.shadow.ab}; */
  background-color: white;
  border-top: solid;
  border-top-width: 0.1px;
  border-color: ${(props) => props.theme.color.twitter.grey};
  overflow: hidden;
  /* margin-bottom: ${(props) => props.theme.spacing.c}; */
  &:hover {
    background-color: ${(props) => props.theme.color.grey.j};
  }
`;

const WorkoutCard: React.FC<WorkoutCardData> = (props: WorkoutCardData) => {
  const { name, username } = props;
  return (
    <Container>
      Workout {name} {username}
    </Container>
  );
};

export default WorkoutCard;
