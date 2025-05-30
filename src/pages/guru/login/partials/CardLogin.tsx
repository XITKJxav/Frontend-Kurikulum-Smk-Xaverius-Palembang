import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { ActionButton } from "@components/Button";
import InputTextField from "@components/Input/InputText";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoSekolah from "@assets/logo.png";
import useKaryawanAuthentication from "../authentication/hook/useKaryawanAuthentication";

const CardLogin = () => {
  const { control } = useFormContext();
  const { handleSigninForm } = useKaryawanAuthentication();

  return (
    <AppearFadeIn
      direction="left"
      className="flex items-center justify-center min-h-screen"
    >
      <div className="w-full max-w-md p-6 border shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl border-white/20">
        <div className="flex flex-col items-center gap-6 text-white">
          <img
            src={LogoSekolah}
            alt="Logo Sekolah"
            className="object-contain w-20 h-20"
          />
          <h2 className="text-xl font-semibold text-white">
            Aplikasi Akademik
          </h2>

          <div className="flex flex-col w-full gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Email"
                  id="email"
                  type="email"
                  color="text-white"
                  autoComplete="off"
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputBase-input::placeholder": {
                      color: "white",
                      opacity: 0.7,
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
                />
              )}
            />

            <div className="text-right">
              <Link
                to="/reset-password"
                className="text-sm underline transition text-gray/80 hover:bg-black"
              >
                Lupa password?
              </Link>
            </div>

            <ActionButton
              label="Masuk"
              onClick={handleSigninForm}
              color="primary"
              className="w-full font-medium text-white"
            />
          </div>
        </div>
      </div>
    </AppearFadeIn>
  );
};

export default CardLogin;
