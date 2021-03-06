import styled from 'styled-components';
import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ApiContext } from '../contexts/apiContextProvider';

const StyledNav = styled.nav`
  /* background-color: ${(props) => props.theme.color.grey.a}; */
  z-index: 1;
  border: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.color.twitter.grey};
`;

const Text = styled.div`
  color: black;
`;

const BlueText = styled.div`
  color: ${(props) => props.theme.color.twitter.blue};
`;

const DarkGreyText = styled.div`
  color: ${(props) => props.theme.color.twitter.darkGrey};
`;

const Nav = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const apiService = useContext(ApiContext);
  const logout = useCallback(async () => {
    try {
      await apiService.post('/auth/logout', {});
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  return (
    <StyledNav className="navbar navbar-dark navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand text">
          <Text>8Workout</Text>
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                <DarkGreyText>Exercises</DarkGreyText>
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/workouts" className="nav-link">
                <DarkGreyText>Workouts</DarkGreyText>
              </Link>
            </li>
          </ul>
        </div>
        <div className="collpase navbar-collapse">
          {!auth.authenticated && (
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  <BlueText>Log In</BlueText>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link">
                  <Text>Sign Up</Text>
                </Link>
              </li>
            </ul>
          )}
          {auth.authenticated && (
            <ul className="navbar-nav ml-auto">
              <NavDropdown
                id="nav"
                title={auth.username}
                className="nav-item dropdown"
              >
                <NavDropdown.Item href="#">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
          )}
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
