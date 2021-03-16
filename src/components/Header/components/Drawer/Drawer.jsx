import React, {Suspense} from 'react';
import {AuthCheck} from 'reactfire';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import MUIDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ListContainer = styled.div`
  width: 300px;
`;

const ListItemContainer = ({page}) => {
  const ListItem = (
    <MUIListItem button component={Link} to={page.path}>
      <ListItemText primary={page.name} />
    </MUIListItem>
  );
  if (page.redirect) {
    return (
      <AuthCheck requiredClaims={page.requiredClaims}>{ListItem}</AuthCheck>
    );
  }
  return ListItem;
};

const Drawer = ({open, setOpen, headerPages}) => {
  const toggleDrawer = (newOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(newOpen);
  };

  return (
    <MUIDrawer open={open} onClose={toggleDrawer(false)}>
      <ListContainer
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Suspense fallback={<></>}>
          <List>
            {headerPages.map((headerPage) => (
              <ListItemContainer key={headerPage.path} page={headerPage} />
            ))}
          </List>
        </Suspense>
      </ListContainer>
    </MUIDrawer>
  );
};

export default Drawer;
