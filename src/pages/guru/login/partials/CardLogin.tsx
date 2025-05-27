import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { ActionButton } from "@components/Button";
import InputTextField from "@components/Input/InputText";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoSekolah from "@assets/logo.png";
const CardLogin = () => {
  const { control } = useFormContext();
  const handleSubmitForm = () => {
    //
  };

  return (
    <AppearFadeIn direction="left" className="p-5 drop-shadow-xl">
      <div className="flex justify-center items-center">
        <div className="card border flex flex-wrap flex-col gap-3">
          <img src={LogoSekolah} alt="" className="" />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="email"
                id="email"
                type="email"
                autoComplete="off"
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
      </div>
    </AppearFadeIn>
  );
};
export default CardLogin;
