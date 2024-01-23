import { PropsWithChildren, useEffect } from "react";
import { UserBasicInfo, checkAuth } from "../../util";
import { useNavigate } from "react-router";

export type PageWithAuthProps = PropsWithChildren & {
  skipRedirect?: boolean;
  onSuccessfulAuth?: (user: UserBasicInfo) => void;
};

function Page({ children, skipRedirect, onSuccessfulAuth }: PageWithAuthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const action = async () => {
      const user = await checkAuth(() => !skipRedirect && navigate("/login"));

      if (user && onSuccessfulAuth) onSuccessfulAuth(user);
    };

    action();
  }, [navigate, skipRedirect, onSuccessfulAuth]);

  return <>{children}</>;
}

export default Page;
