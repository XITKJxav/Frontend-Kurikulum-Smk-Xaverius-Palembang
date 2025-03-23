import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect } from "react";
// import usePayedKas from "./hooks/usePayedKas";
import { useSchedulePageContext } from "./context";

const PayedKasLayout = () => {
  const { state } = useSchedulePageContext();

  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      <div>Schedule</div>
    </AppearFadeIn>
  );
};

export default PayedKasLayout;
