import { Button , BaseLayout} from "../../components";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { IconsDisplayAll } from "../../utils/Icons";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        // <div className="HomePageContainer">
        //     <h1>Welcome to the Todo App</h1>

        //     <Button
        //         text="Login / Signup"
        //         onClick={() => {
        //             navigate("/auth/login");
        //         }}
        //     ></Button>
        // </div>
        <>
            {/* <IconsDisplayAll /> */}
            <BaseLayout />
        </>
    );
};

export default HomePage;
