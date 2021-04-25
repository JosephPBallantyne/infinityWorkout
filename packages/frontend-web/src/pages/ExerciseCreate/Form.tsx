import React, { useContext } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useHistory } from 'react-router-dom';
import { CreateExercise, StaticExerciseData } from '../../types/exercise.type';
import { ApiContext } from '../../contexts/apiContextProvider';

interface StaticData {
  staticData: StaticExerciseData;
}

const ToggleButtonRadio = styled(ToggleButton)`
  &:hover {
    background-color: ${(props) => props.theme.color.blue.g};
    color: ${(props) => props.theme.color.blue.j};
  }
`;

const ToggleButtonChip = styled(ToggleButton)`
  margin-right: ${(props) => props.theme.spacing.c} !important;
  margin-bottom: ${(props) => props.theme.spacing.c} !important;
  border-radius: 25px !important;
  &:hover {
    background-color: ${(props) => props.theme.color.blue.g};
    color: ${(props) => props.theme.color.blue.j};
  }
`;

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  display: inline-block;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: true;
`;

const SectionHeader = styled.div`
  min-width: 200px;
`;

const SectionInput = styled.div`
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.e};
`;

const Divider = styled.hr`
  margin: 0;
  padding-top: 0;
  padding-bottom: ${(props) => props.theme.spacing.c};
`;

const Form = ({ staticData }: StaticData) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
  } = useForm<CreateExercise>();
  const apiService = useContext(ApiContext);
  const history = useHistory();
  const selectedMuscleGroups = watch('muscleGroupIds', []);
  const selectedMuscles = watch('muscleIds', []);
  const uncheckMuscleGroup = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      const muscleGroupId = Number(e.currentTarget.value);
      const muscleIdsToFilter = staticData.muscles
        .filter((muscle) => muscle.muscleGroupId === muscleGroupId)
        .map((muscle) => {
          return muscle.id;
        });
      const muscleIds = selectedMuscles.filter(
        (id) => !muscleIdsToFilter.includes(id)
      );
      setValue('muscleIds', muscleIds);
    }
  };

  const onSubmit: SubmitHandler<CreateExercise> = async (data) => {
    try {
      await apiService.post('/exercises', data);
      history.push('/');
    } catch (err) {
      return console.log(err);
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Divider />
      <FormSection>
        <SectionHeader>Details</SectionHeader>
        <SectionInput>
          <Section className="form-group column">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              name="name"
              id="name"
              ref={register({ required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </Section>

          <Section className="form-group column">
            <label htmlFor="trainingType">Training Type</label>
            <div>
              <Controller
                control={control}
                name="trainingTypeId"
                as={
                  <ToggleButtonGroup name="trainingTypeOptions" type="radio">
                    {staticData.trainingTypes.map((trainingType) => {
                      return (
                        <ToggleButtonRadio
                          variant="outline-primary"
                          value={trainingType.id}
                        >
                          {trainingType.name}
                        </ToggleButtonRadio>
                      );
                    })}
                  </ToggleButtonGroup>
                }
              />
            </div>
          </Section>

          <Section className="form-group column">
            <label htmlFor="equipment">Equipment</label>
            <div>
              <Controller
                control={control}
                name="equipmentId"
                as={
                  <ToggleButtonGroup type="radio" name="equipmentOptions">
                    {staticData.equipment.map((equipment) => {
                      return (
                        <ToggleButtonRadio
                          variant="outline-primary"
                          value={equipment.id}
                        >
                          {equipment.name}
                        </ToggleButtonRadio>
                      );
                    })}
                  </ToggleButtonGroup>
                }
              />
            </div>
          </Section>

          <Section className="form-group column">
            <label htmlFor="muscleGroup">Muscle Group</label>
            <div>
              <Controller
                control={control}
                name="muscleGroupIds"
                as={
                  <ToggleButtonGroupStyled
                    type="checkbox"
                    name="muscleGroupOptions"
                  >
                    {staticData.muscleGroups.map((muscleGroup) => {
                      return (
                        <ToggleButtonChip
                          value={muscleGroup.id}
                          variant="outline-primary"
                          onChange={(e) => {
                            uncheckMuscleGroup(e);
                          }}
                        >
                          {muscleGroup.name}
                        </ToggleButtonChip>
                      );
                    })}
                  </ToggleButtonGroupStyled>
                }
              />
            </div>
          </Section>

          <Section className="form-group column">
            <label htmlFor="muscleGroup">Muscles</label>
            <div>
              {selectedMuscleGroups && (
                <Controller
                  control={control}
                  name="muscleIds"
                  as={
                    <ToggleButtonGroupStyled
                      type="checkbox"
                      name="muscleOptions"
                    >
                      {staticData.muscles.map((muscle) => {
                        if (
                          selectedMuscleGroups.includes(muscle.muscleGroupId)
                        ) {
                          return (
                            <ToggleButtonChip
                              value={muscle.id}
                              variant="outline-primary"
                            >
                              {muscle.name} ({muscle.head})
                            </ToggleButtonChip>
                          );
                        }
                        return null;
                      })}
                    </ToggleButtonGroupStyled>
                  }
                />
              )}
            </div>
          </Section>
        </SectionInput>
      </FormSection>
      <Divider />

      <FormSection>
        <SectionHeader />
        <Button type="submit">Create Exercise</Button>
      </FormSection>
    </form>
  );
};

export default Form;
