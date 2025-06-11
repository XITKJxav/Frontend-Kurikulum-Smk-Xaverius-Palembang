import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const globalRouter = {
  navigate: null as NavigateFunction | null,
};

export const AppWrapper = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
};
