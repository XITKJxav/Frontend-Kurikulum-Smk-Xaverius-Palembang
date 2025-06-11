import AppearFadeIn from "@components/Animation/AppearFadeIn";
import SchedulePage from ".";

const PayedKasLayout = () => {
  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      <div>Schedule</div>

      <SchedulePage />
    </AppearFadeIn>
  );
};

export default PayedKasLayout;
