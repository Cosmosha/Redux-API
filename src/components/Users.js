import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/users/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return <h2> Loading... </h2>;
  }

  if (error) {
    return (
      <div>
        <h2> Oops!Something went wrong... </h2> <p> {error} </p>{' '}
      </div>
    );
  }
  return (
    <div>
      {' '}
      <ul>
        {' '}
        {users ? (
          users.map((user) => {
            return (
              <li key={user.phone}>
                {' '}
                {user.name.first} {user.name.last}{' '}
              </li>
            );
          })
        ) : (
          <h3> No Data Found.. </h3>
        )}{' '}
      </ul>{' '}
    </div>
  );
};

export default Users;
