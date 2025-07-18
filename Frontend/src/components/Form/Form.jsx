import { Input, Button } from "../";
import "./Form.css";
import { useForm } from "react-hook-form";

const Form = ({
    inputsFormat = [
        { label: "label", type: "text", validations: {} },
    ],
    buttonText,
    buttonStyle = {},
    onSubmit = () => {},
}) => {
    const { register, handleSubmit, watch, formState = { errors } } = useForm();

    let inputs = Array(inputsFormat.length);

    for (let i = 0; i < inputsFormat.length; i++) {
        let obj = inputsFormat[i];

        let validations = obj.validations || { required: false };
        delete obj.validations;

        inputs[i] = (
            <Input
                key={i}
                {...obj}
                {...register(`${obj.label}`, { ...validations })}
                watch={watch}
            ></Input>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="FormContainer">
            {inputs}
            <Button text={buttonText} type="submit" style = {buttonStyle}></Button>
        </form>
    );
};

export default Form;
