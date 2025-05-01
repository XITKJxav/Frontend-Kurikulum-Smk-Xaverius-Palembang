import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { ActionButton } from "@components/Button";
import CardAutosize from "@components/Card/CardAutosize";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import useLoginAdministratorClassForm from "../loginUser/hook/useLoginAdministratorClassForm";
import useLoginAdministratorClass from "../loginUser/hook/useLoginAdministratorClass";

const CardLogin = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useLoginAdministratorClass();

  return (
    <CardAutosize
      className="mx-auto backdrop-blur-lg  bg-stone-500/30 shadow-lg rounded-lg"
      initialSize={{ width: "40.3rem" }}
      trigger={true}
      animateSize={{ width: "100rem" }}
    >
      <AppearFadeIn direction="left" className="drop-shadow-xl p-5">
        <div className=" flex flex-col justify-center items-center">
          <div className="mt-3 mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-white font-medium"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  placeholder="yourEmail@gmail.com"
                  autoComplete="off"
                  className={clsx(
                    "w-full px-5 py-2 rounded-xl bg-white/10",
                    "text-white placeholder-white/70 border border-white/20",
                    "backdrop-blur-md focus:outline-none focus:ring-2",
                    "focus:ring-white/30 focus:border-white/30 transition-all"
                  )}
                />
              )}
            />
          </div>

          <div className="mt-3 mb-2">
            <label
              htmlFor="password"
              className="block mb-2 text-white font-medium"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="password..."
                  autoComplete="off"
                  className={clsx(
                    "w-full px-5 py-2 rounded-xl bg-white/10",
                    "text-white placeholder-white/70 border border-white/20",
                    "backdrop-blur-md focus:outline-none focus:ring-2",
                    "focus:ring-white/30 focus:border-white/30 transition-all"
                  )}
                />
              )}
            />
          </div>

          <div className="w-full mb-3">
            <Link
              to="/reset-password"
              className="mb-3 text-sm text-white/80 hover:text-white underline transition-all duration-200 ease-in-out"
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
