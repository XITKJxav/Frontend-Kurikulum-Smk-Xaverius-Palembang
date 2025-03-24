import AppearFadeIn from "@components/Animation/AppearFadeIn";

import { useSchedulePageContext } from "./context";
import axios from "axios";
import { json } from "stream/consumers";

const PayedKasLayout = () => {
  const { state } = useSchedulePageContext();

  const url = "http://127.0.0.1:8000/api/v1/jurusan";
  const submitData = async () => {
    const data = {
      nama_jurusan: "akuntansi serbarss",
    };

    const res = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  };
  return (
    <AppearFadeIn
      direction="bottom"
      delay={0.7}
      className="md:h-[60vh] h-[75vh]"
    >
      <div>Schedule</div>
      <button onClick={submitData}>submit</button>
    </AppearFadeIn>
  );
};

export default PayedKasLayout;
