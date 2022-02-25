import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { getUser } from '../../services/user';

export const User = () => {
  const { token } = useContext(AppContext);
  const { userId } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await getUser(userId, token);
      setUser(userDetails);
      setAuthenticated(userDetails.username? true: false);
    };
    fetchUser()
  }, [token, userId]);

  return (
    <div>
      <h1>{`Item page! item id: ${userId}`}</h1>
      <h2>{`Username: ${user.username}`}</h2>
      <p>{`authenticated: ${authenticated}`}</p>
    </div>
  );
};
