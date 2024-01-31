import "./styles.css";

import { useForm, SubmitHandler } from "react-hook-form";

type FromFields = {
  email: string;
  password: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FromFields>({
    mode: "onChange",
    defaultValues: {
      email: "test@test.com",
    },
  });
  const onSubmit: SubmitHandler<FromFields> = async (data) => {
    console.log("isvalid", isValid);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("email", { message: "This email is already taken" });
      //setError("root", { message: "This email is already taken" }); //To display error for form
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }
              return true;
            },
          })}
          type="text"
        />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          type="password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <button type="submit" disabled={!isValid ? true : false}>
          Submit
        </button>
        {/* {errors.root && <div>{errors.root.message}</div>}  for root error display */}
      </form>
    </div>
  );
}
