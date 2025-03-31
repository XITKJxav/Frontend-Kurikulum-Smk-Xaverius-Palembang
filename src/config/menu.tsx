import {
  Home,
  CalendarMonth,
  HomeWork,
  Settings,
  School,
} from "@mui/icons-material";
import HomePage from "@pages/guru/homepage";
import JadwalPage from "@pages/guru/jadwal";
import JurusanPage from "@pages/guru/managejurusan";

export const listMenuGuru = [
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
    title: "manage jurusan",
    icon: <School />,
    part: <JurusanPage />,
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
