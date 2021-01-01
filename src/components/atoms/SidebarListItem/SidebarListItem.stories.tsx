import { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SidebarListItem } from './SidebarListItem';

export default {
  title: 'atoms/SidebarListItem',
  component: SidebarListItem,
};

export const _default: Story<ComponentProps<typeof SidebarListItem>> = () => {
  return (
    <>
      hoge
      {/* <h4>List Item With Icon</h4>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <SidebarListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="hoge" />
          </SidebarListItem>
        </Grid>
        <Grid item xs={3}>
          <SidebarListItem button isActive>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="hoge" />
          </SidebarListItem>
        </Grid>
      </Grid>

      <h4>Disabled List Item </h4>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <SidebarListItem button disabled>
            <ListItemIcon>
              <HomeIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="hoge" />
          </SidebarListItem>
        </Grid>
        <Grid item xs={3}>
          <SidebarListItem button disabled isActive>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="hoge" />
          </SidebarListItem>
        </Grid>
      </Grid> */}
    </>
  );
};
