import { PropsWithChildren } from 'react';
import { Wrapper } from './PageWrapper.style';

function PageWrapper({ children }: PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}

export default PageWrapper;
