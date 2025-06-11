import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { ActionButton } from "@components/Button";
import CardAutosize from "@components/Card/CardAutosize";
import clsx from "clsx";
import { Link } from "react-router-dom";

const CardLogin = () => {
  return (
    <CardAutosize
      className="mx-auto rounded-lg shadow-lg backdrop-blur-lg bg-stone-500/30"
      initialSize={{ width: "40.3rem" }}
      trigger={true}
      animateSize={{ width: "100rem" }}
    >
      <AppearFadeIn direction="left" className="p-5 drop-shadow-xl">
        <div className="flex flex-col items-center justify-center ">
          <div className="mt-3 mb-3">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="yourEmail@gmail.com"
              className={clsx(
                "w-full px-5 py-2 rounded-xl bg-white/10",
                "text-white placeholder-white/70 border border-white/20",
                "backdrop-blur-md focus:outline-none focus:ring-2",
                "focus:ring-white/30 focus:border-white/30 transition-all"
              )}
              autoComplete="off"
            />
          </div>

          <div className="mt-3 mb-2">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-white"
            >
              Password
            </label>
            <input
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
          </div>
          <div className="w-full mb-3">
            <Link
              to="/reset-password"
              className="mb-3 text-sm underline transition-all duration-200 ease-in-out text-white/80 hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>

          <ActionButton label="Sign In" color="primary" className="w-full" />
        </div>
      </AppearFadeIn>
    </CardAutosize>
  );
};
export default CardLogin;
