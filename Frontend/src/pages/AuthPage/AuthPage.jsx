import { useEffect, useState } from "react";
import { Form, Button } from "../../components/";
import "./AuthPage.css";
import { data, Link, useNavigate, useParams } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();

    const { authType } = useParams();

    const [heading, setHeading] = useState();

    const [inputsFormat, setinputsFormat] = useState();
    const [buttonText, setButtonText] = useState();

    const [text1, setText1] = useState();
    const [link1Text, setLink1Text] = useState();
    const [link1Path, setLink1Path] = useState();

    const [text2, setText2] = useState();
    const [link2Text, setLink2Text] = useState();
    const [link2Path, setLink2Path] = useState();

    const [isEmailVerifyPage, setIsEmailVerifyCause] = useState(false);

    console.log(isEmailVerifyPage);

    useEffect(() => {
        switch (authType) {
            case "login":
                setHeading("Welcome Back to XYX");

                setinputsFormat([
                    {
                        label: "Email",
                    },
                    {
                        label: "Password",
                    },
                ]);
                setButtonText("Log in");

                setText1("Forgot Password ?");
                setLink1Text("Reset Password");
                setLink1Path("/auth/reset-password");

                setText2("No Account ?");
                setLink2Text("Create Account ");
                setLink2Path("/auth/register");

                setIsEmailVerifyCause(false);
                break;

            case "register":
                setHeading("Create Account");

                setinputsFormat([
                    {
                        label: "Email",
                    },
                ]);
                setButtonText("Continue with Email");

                setText1("");
                setLink1Text("");
                setLink1Path("");

                setText2("");
                setLink2Text("");
                setLink2Path("");

                setIsEmailVerifyCause(false);
                break;

            case "reset-password":
                setHeading("Enter Your Email To Reset Password");

                setinputsFormat([
                    {
                        label: "Email",
                    },
                ]);
                setButtonText("Reset Password");

                setText1("");
                setLink1Text("Cancel");
                setLink1Path("/auth/login");

                setText2("");
                setLink2Text("");
                setLink2Path("");

                setIsEmailVerifyCause(false);
                 break;

            default:
                navigate("/auth/login");
        }
    }, [authType]);

    const onSubmit = (data) => {
        console.log(data);

        switch (authType) {
            case "loin":
                break;

            case "register":
                if (inputsFormat.length === 1) {
                    setHeading("Create Account");

                    setinputsFormat([
                        {
                            label: "Email",
                        },
                        {
                            label: "Password",
                        },
                    ]);
                    setButtonText("Create Account");

                    setText1("Already Have an account ?");
                    setLink1Text("Log in");
                    setLink1Path("/auth/login");

                    setText2("");
                    setLink2Text("");
                    setLink2Path("");

                    setIsEmailVerifyCause(false);
                    break;
                }
            // else setIsEmailVerifyPage(true)

            // case "reset-password":
            // setEmailVerifyCause(true);

            default:
                setIsEmailVerifyCause(true);
                setHeading("Check Your Inbox");
                if (authType === "register") {
                    setText1(
                        <>
                            Click on the link we sent to <b> {data.Email} </b>{" "}
                            to finish account setup
                        </>,
                    );
                    setText2(`No email in your inbox or spam folder ?`);
                    setLink2Text("Let's resend it");
                    setLink2Path("#");
                } else if (authType === "reset-password") {
                    setText1(
                        <>
                            if an account exists for <b> {data.Email} </b>, you
                            we recieve an email with instructions on resetting
                            your password.
                        </>,
                    );
                    setText2("");
                    setLink2Text("");
                }
        }
    };

    return (
        <div className="AuthPageContainer">
            <div className="AuthPageLogo" />
            <div className="AuthFormContainer">
                {!isEmailVerifyPage ? (
                    <>
                        <h1 className="AuthPageHeading">{heading}</h1>
                        <Button
                            className="GoogleButton"
                            style={{ "--bg": "white" }}
                        />
                        <p>or</p>
                        <Form
                            inputsFormat={inputsFormat}
                            onSubmit={onSubmit}
                            buttonText={buttonText}
                        />

                        <p>
                            {text1}{" "}
                            <Link to={link1Path} className="AuthPageLink">
                                {link1Text}
                            </Link>
                        </p>
                        <p>
                            {text2}{" "}
                            <Link to={link2Path} className="AuthPageLink">
                                {link2Text}
                            </Link>
                        </p>
                    </>
                ) : (
                    <>
                        <div className="AuthPageCheckEmailImage" />
                        <h1 className="AuthPageHeading noDecor">{heading}</h1>
                        <p className="WrapText">{text1}</p>
                        <br />
                        <a href="https://mail.google.com" target="_blank">
                            <Button text="Open Gmail"></Button>
                        </a>
                        <p>
                            {" "}
                            {text2} <Link to={link2Path}> {link2Text} </Link>{" "}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
