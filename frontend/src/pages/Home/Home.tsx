import { Navbar, PageWrapper } from "../../components";
import { useContent } from "../../content";
import PageWithAuth from "../../components/PageWithAuth";
import { UserView } from "./views";

function Home() {
  const { t } = useContent();

  return (
    <PageWithAuth>
      <Navbar isHome />
      <PageWrapper>
        <UserView />
      </PageWrapper>
    </PageWithAuth>
  );
}

export default Home;
