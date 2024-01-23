import { PropsWithChildren } from 'react';
import { useTheme } from '@mui/material';

import { Containter } from './AppContainer.style';

function AppContainer({ children }: PropsWithChildren) {
  const { palette } = useTheme();

  return <Containter sx={{ backgroundColor: palette.primary.light }}>{children}</Containter>;
}

export default AppContainer;
