import { Home, CalendarMonth, HomeWork, Settings } from "@mui/icons-material";
import HomePage from "@pages/guru/homepage";
import JadwalPage from "@pages/guru/jadwal";

export const listMenu = [
  {
    title: "home",
    icon: <Home />,
    part: <HomePage />,
  },
  {
    title: "jadwal",
    icon: <CalendarMonth />,
    part: <JadwalPage />,
  },
  {
    title: "penugasan",
    icon: <HomeWork />,
    part: <HomePage />,
  },
  {
    title: "settings",
    icon: <Settings />,
    part: <HomePage />,
  },
];
