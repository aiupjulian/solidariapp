import React from 'react';
import {useFirestore, useFirestoreCollectionData} from 'reactfire';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const MAX_TOP_USERS = 10;

const StyledList = styled(List)`
  max-width: 600px;
  margin-top: ${({theme}) => theme.spacing(2)}px;
`;

const UserName = styled(ListItemText)`
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const AcknowledgementsCount = styled(ListItemText)`
  flex: 0 1 auto;
`;

const TopUsers = () => {
  const topUsersRef = useFirestore()
    .collection('acknowledgements')
    .orderBy('acknowledgements', 'desc')
    .where('acknowledgements', '!=', 0)
    .limit(MAX_TOP_USERS);
  const topUsers = useFirestoreCollectionData(topUsersRef);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Top Usuarios
      </Typography>
      <Typography variant="body1">
        Estos son los usuarios mas solidarios de la aplicación ordenados por
        cantidad de agradecimientos:
      </Typography>
      <StyledList>
        {topUsers.map((user) => (
          <ListItem key={user.uid} divider>
            <ListItemAvatar>
              <Avatar src={user.photoURL} />
            </ListItemAvatar>
            <UserName primary={user.displayName} />
            <AcknowledgementsCount primary={user.acknowledgements} />
          </ListItem>
        ))}
      </StyledList>
    </>
  );
};

export default TopUsers;
