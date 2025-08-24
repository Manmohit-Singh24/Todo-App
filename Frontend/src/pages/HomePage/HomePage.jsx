import { Button, TodoCheckBox, TodoTaskCard } from "../../components";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { IconsDisplayAll } from "../../utils/Icons";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <IconsDisplayAll />

            <div className="HomePageContainer">
                <h1>Welcome to the Todo App</h1>

                <Button
                    text="Login / Signup"
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                    className={"HomePageButton"}
                ></Button>

                <Button
                    text="Todos"
                    onClick={() => {
                        navigate("/app/todo/today");
                    }}
                    className={"HomePageButton"}
                ></Button>

                <Button
                    text="Notes"
                    onClick={() => {
                        navigate("/app/notes/");
                    }}
                    className={"HomePageButton"}
                ></Button>
            </div>
        </>
    );
};

export default HomePage;
