import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="HomePageContainer">
            <h1>Welcome to the Todo App</h1>

            <Button
                text="Login / Signup"
                onClick={() => {
                    navigate("/auth/login");
                }}
            ></Button>
        </div>
    );
};

export default HomePage;
