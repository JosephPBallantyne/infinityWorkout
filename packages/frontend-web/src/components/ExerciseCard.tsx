import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Comments, Like, Options } from '../utils/icons';
import { ExerciseCardData } from '../types/exercise.type';

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

const LinkCard = styled(Link)`
  text-decoration: none !important;
`;

const Exercise = styled.div`
  color: ${(props) => props.theme.color.grey.a};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.d};
  font-weight: bold;
`;

const Muscle = styled.div`
  color: ${(props) => props.theme.color.grey.b};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.c};
`;

const User = styled.div`
  color: ${(props) => props.theme.color.grey.d};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.m};
  font-style: italic;
  padding-top: ${(props) => props.theme.spacing.a};
`;

const LikeInfo = styled.div`
  color: ${(props) => props.theme.color.grey.d};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.m};
`;

const TopBar = styled.div`
  box-sizing: border-box;
  padding-right: ${(props) => props.theme.spacing.d};
  padding-top: ${(props) => props.theme.spacing.c};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MidSection = styled.div`
  box-sizing: border-box;
  /* height: 100%; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  padding-left: ${(props) => props.theme.spacing.f};
  padding-bottom: ${(props) => props.theme.spacing.c};
`;

const FooterBar = styled.div`
  box-sizing: border-box;
  /* height: ${(props) => props.theme.spacing.i}; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-top: solid;
  border-width: 2px;
  border-color: ${(props) => props.theme.color.grey.i}; */
  padding-left: ${(props) => props.theme.spacing.f};
  padding-right: ${(props) => props.theme.spacing.f};
  padding-top: ${(props) => props.theme.spacing.b};
  padding-bottom: ${(props) => props.theme.spacing.b};
  /* background-color: ${(props) => props.theme.color.grey.i}; */
`;

const IconBox = styled.div`
  box-sizing: border-box;
  display: flex;
  /* padding-right: ${(props) => props.theme.spacing.k}; */
  align-items: center;
`;

const IconTotal = styled.div`
  color: ${(props) => props.theme.color.grey.d};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.m};
  font-style: italic;
  padding-left: ${(props) => props.theme.spacing.b};
`;

const CustomToggle = React.forwardRef(
  (props: any, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      <Options />
    </a>
  )
);

const ExerciseCard: React.FC<ExerciseCardData> = (props: ExerciseCardData) => {
  const {
    exercise,
    exerciseId,
    muscleGroup,
    trainingType,
    equipment,
    username,
    createdAt,
    commentsTotal,
    likesTotal,
    isLiked,
    isBookmarked,
    workouts,
  } = props;
  return (
    <Container>
      <LinkCard to={`/exercise/${exerciseId}`}>
        <TopBar>
          <User>
            {username} - {createdAt}
          </User>
        </TopBar>
        <MidSection>
          <Exercise>{exercise}</Exercise>
          <Muscle>{muscleGroup}</Muscle>
          <div className="d-flex pb-2 pt-2">
            <div>{trainingType}</div>
            <div>{equipment}</div>
          </div>
        </MidSection>
        <FooterBar>
          <IconBox>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
                // drop="right"
              >
                Custom toggle
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Add to Workout</Dropdown.Header>
                <>
                  {workouts &&
                    workouts.data.map((workout: any) => {
                      console.log(workout.name);
                      return (
                        <Dropdown.Item href="/">{workout.name}</Dropdown.Item>
                      );
                    })}
                </>
              </Dropdown.Menu>
            </Dropdown>
          </IconBox>
          <IconBox>
            <Comments />
            <IconTotal>{commentsTotal}</IconTotal>
          </IconBox>
          <IconBox>
            <Like />
            <IconTotal>{likesTotal}</IconTotal>
          </IconBox>
        </FooterBar>
      </LinkCard>
    </Container>
  );
};

export default ExerciseCard;
