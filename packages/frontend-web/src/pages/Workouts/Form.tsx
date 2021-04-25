import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { CreateWorkout } from '../../types/workout.type';
import { ApiContext } from '../../contexts/apiContextProvider';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: true;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 200px;
`;

const SectionInput = styled.div`
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.e};
`;

const Divider = styled.hr`
  margin-top: ${(props) => props.theme.spacing.f};
`;

const Form = () => {
  const { register, handleSubmit, errors } = useForm<CreateWorkout>();
  const apiService = useContext(ApiContext);
  const history = useHistory();

  const onSubmit: SubmitHandler<CreateWorkout> = async (data) => {
    try {
      const workout = await apiService.post('/workouts', data);
      history.push(`/workouts/${workout.data.id}`);
    } catch (err) {
      return console.log(err);
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <SectionHeader>Create Workout</SectionHeader>
        <SectionInput>
          <Section>
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              name="name"
              id="name"
              ref={register({ required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </Section>

          <Section>
            <label htmlFor="notes">Notes</label>
            <input
              className="form-control"
              name="notes"
              id="notes"
              ref={register({ required: true })}
            />
            {errors.notes && <span>This field is required</span>}
          </Section>

          <Section>
            <div className="d-flex align-items-center justify-content-start">
              <input
                className="form-control"
                name="isPrivate"
                id="isPrivate"
                type="checkbox"
                style={{ width: '16px', marginRight: '8px' }}
                ref={register({ required: true })}
              />
              <label htmlFor="isPrivate" style={{ margin: '0' }}>
                Private
              </label>
            </div>
          </Section>
        </SectionInput>
      </FormSection>

      <FormSection>
        <SectionHeader />
        <Button type="submit">Create Workout</Button>
      </FormSection>
      <Divider />
    </form>
  );
};

export default Form;
