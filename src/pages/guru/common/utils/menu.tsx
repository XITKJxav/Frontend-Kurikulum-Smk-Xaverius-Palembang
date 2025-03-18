import { Home, CalendarMonth, HomeWork, Settings } from "@mui/icons-material";
import HomePage from "@pages/guru/homepage";
import JadwalPage from "@pages/guru/jadwal";

export const listMenu = [
  {
    title: "home",
    icon: <Home />,
  },
  {
    title: "jadwal",
    icon: <CalendarMonth />,
  },
  {
    title: "penugasan",
    icon: <HomeWork />,
  },
  {
    title: "settings",
    icon: <Settings />,
  },
];

export const listPart = [
  {
    name: "home",
    part: <HomePage />,
  },
  {
    name: "jadwal",
    part: <JadwalPage />,
  },
  {
    name: "penugasan",
    part: <HomePage />,
  },
  {
    name: "settings",
    part: <HomePage />,
  },
];
