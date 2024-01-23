import { ArrowBackRounded } from '@mui/icons-material';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Link } from 'react-router-dom';

import { PageWrapper } from '../../components';
import { useContent } from '../../content';
import { MainArea } from './NotFound.style';

function NotFound() {
  const { t } = useContent();

  const { breakpoints } = useTheme();
  const isLarge = useMediaQuery(breakpoints.up('md'));

  return (
    <PageWrapper>
      <MainArea>
        <img src="/not-found.svg" alt="404" style={{ height: isLarge ? '300px' : '30vw' }} />

        <Typography variant="h3" component="h3">
          {t('notFound.title')}
        </Typography>

        <Typography variant="h6" component="h6" sx={{ mt: '-2.5rem' }}>
          {t('notFound.subtitle')}
        </Typography>

        <Link to="/">
          <Button variant="contained" sx={{ boxShadow: 8 }} startIcon={<ArrowBackRounded />}>
            {t('notFound.back')}
          </Button>
        </Link>
      </MainArea>
    </PageWrapper>
  );
}

export default NotFound;
