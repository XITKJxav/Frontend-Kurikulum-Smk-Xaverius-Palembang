import {
  Home,
  CalendarMonth,
  HomeWork,
  Settings,
  School,
  Class,
  SupervisorAccount,
} from "@mui/icons-material";
import ClassCoordinatorPage from "@pages/guru/classcoordinator";
import ClassRoomPage from "@pages/guru/classroom";
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
    titleDropDown: "Akademik",
    icon: <Class />,
    children: [
      {
        title: "manage jurusan",
        icon: <School />,
        part: <JurusanPage />,
      },
      {
        title: "ruang kelas",
        icon: <Class />,
        part: <ClassRoomPage />,
      },
      {
        title: "ketua kelas",
        icon: <SupervisorAccount />,
        part: <ClassCoordinatorPage />,
      },
    ],
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
