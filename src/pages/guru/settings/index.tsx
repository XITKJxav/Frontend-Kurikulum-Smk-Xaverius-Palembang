import { SettingsKaryawanpageProvider } from "./context";
import SettingKaryawanBody from "./partials/SettingKaryawanBody";

const SettingsKaryawanPage = () => {
  return (
    <SettingsKaryawanpageProvider>
      <SettingKaryawanBody />
    </SettingsKaryawanpageProvider>
  );
};
export default SettingsKaryawanPage;
