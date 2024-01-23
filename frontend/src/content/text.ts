import signup from './signup';
import home from './home';
import login from './login';
import other from './other';

export default {
  ...login,
  ...signup,
  ...home,
  ...other,
} as const;
