import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Wrraper from "../../components/Wrraper";

const Home = () => {
  return (
    <Wrraper>
      <NavBar />
      <Main />
    </Wrraper>
  );
};

export default Home;
