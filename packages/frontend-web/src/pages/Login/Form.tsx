import React, { useContext, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ApiContext } from '../../contexts/apiContextProvider';
import { Login } from '../../types/user.type';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Form = () => {
  const { register, handleSubmit, errors } = useForm<Login>();
  const apiService = useContext(ApiContext);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Login> = useCallback(
    async (data: Login) => {
      const { email, password } = data;
      try {
        const user = await apiService.post('/auth/login', {
          email,
          password,
        });
        if (user) {
          const { username } = user.data;
          dispatch({ type: 'LOGIN', payload: { username, email } });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return (
    <>
      {auth.authenticated && <Redirect to="/" />}
      {!auth.authenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSection>
            <div>
              <div className="form-group column">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  name="email"
                  id="email"
                  ref={register({ required: 'Email required' })}
                />
                {errors.email && (
                  <p
                    style={{ color: 'red', fontSize: '14px' }}
                    className="my-2"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-group column">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  ref={register({ required: 'Password required' })}
                />
                {errors.password && (
                  <p
                    style={{ color: 'red', fontSize: '14px' }}
                    className="my-2"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection>
            <Button type="submit" size="sm">
              Login
            </Button>
          </FormSection>
        </form>
      )}
    </>
  );
};

export default Form;
