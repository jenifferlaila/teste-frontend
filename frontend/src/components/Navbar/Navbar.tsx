import { AppBar, Container, Toolbar, useTheme, Typography } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useContent } from '../../content';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  isHome?: boolean;
}

function Navbar({ isHome = false }: NavbarProps) {
  const { palette } = useTheme();

  const { t } = useContent();

  return (
    <AppBar position="static" sx={{ backgroundColor: palette.primary.light }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: '1000', pr: '1rem', userSelect: 'none' }}
          >
            {t('navbar.title')}
          </Typography>

          <p style={{ marginLeft: 'auto' }}></p>

          <Link to="/" style={{ color: palette.text.primary, visibility: isHome ? 'hidden' : 'visible' }}>
            <ArrowBackIosNew />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
