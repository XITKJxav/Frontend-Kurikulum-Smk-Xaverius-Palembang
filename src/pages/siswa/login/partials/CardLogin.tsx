import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { ActionButton } from "@components/Button";
import CardAutosize from "@components/Card/CardAutosize";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignInClassCoordinator from "../authentication/hook/useSignInCoordinatorClass";
import InputTextField from "@components/Input/InputText";
import { useLoginClassCoordinatorContext } from "../context";
import { LoadingDialog } from "@components/Dialog";

const CardLogin = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useSignInClassCoordinator();
  const { state } = useLoginClassCoordinatorContext();
  const { signInLoading } = state;

  return (
    <CardAutosize
      className="mx-auto rounded-lg shadow-lg backdrop-blur-lg bg-stone-500/30"
      initialSize={{ width: "40.3rem" }}
      trigger={true}
      animateSize={{ width: "100rem" }}
    >
      {signInLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <AppearFadeIn direction="left" className="p-5 drop-shadow-xl">
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <h1 className="mb-6 text-4xl font-bold tracking-wide text-white drop-shadow-md">
            Sign Up
          </h1>
          <Controller
            name="nisn"
            control={control}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="nisn"
                id="nisn"
                type="text"
                autoComplete="off"
                color="text-white"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 0.7,
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Password"
                id="password"
                type="password"
                autoComplete="off"
                color="text-white"
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 0.7,
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
            )}
          />

          <div className="w-full mb-3">
            <Link
              to="/reset-password"
              className="mb-3 text-sm underline transition-all duration-200 ease-in-out text-white/80 hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>

          <ActionButton
            label="Sign In"
            onClick={handleSubmitForm}
            color="primary"
            className="w-full"
          />
        </div>
      </AppearFadeIn>
    </CardAutosize>
  );
};
export default CardLogin;
