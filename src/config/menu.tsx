import {
  Home,
  CalendarMonth,
  HomeWork,
  Settings,
  School,
  Class,
  SupervisorAccount,
  Work,
  MeetingRoom,
  AutoStories,
  Schedule,
  Timer,
  CalendarViewDay,
  Foundation,
  Flag,
  Diversity3Outlined,
  Diversity3,
} from "@mui/icons-material";
import AgendaUpacaraPage from "@pages/guru/agendaupacara";
import ClassCoordinatorPage from "@pages/guru/classcoordinator";
import ClassRoomPage from "@pages/guru/classroom";
import HomePage from "@pages/guru/homepage";
import JadwalPage from "@pages/guru/jadwal";
import KaryawanPage from "@pages/guru/karyawan";
import JurusanPage from "@pages/guru/managejurusan";
import MataPelajaranPage from "@pages/guru/matapelajaran";

export const listMenuGuru = [
  {
    title: "home",
    icon: <Home />,
    part: <HomePage />,
  },
  {
    titleDropDown: "Prasarana",
    icon: <Foundation />,
    children: [
      {
        title: "manage jurusan",
        icon: <School />,
        part: <JurusanPage />,
      },

      {
        title: "ruang kelas",
        icon: <MeetingRoom />,
        part: <ClassRoomPage />,
      },
    ],
  },
  {
    titleDropDown: "Akademik",
    icon: <Class />,
    children: [
      {
        title: "karyawan",
        icon: <Work />,
        part: <KaryawanPage />,
      },
      {
        title: "siswa",
        icon: <SupervisorAccount />,
        part: <ClassCoordinatorPage />,
      },
      {
        title: "mata pelajaran",
        icon: <AutoStories />,
        part: <MataPelajaranPage />,
      },
      {
        title: "jadwal pembelajaran",
        icon: <CalendarMonth />,
        part: <JadwalPage />,
      },
    ],
  },
  {
    titleDropDown: "manage jadwal",
    icon: <CalendarMonth />,
    children: [
      {
        title: "durasi pembelajaran",
        icon: <Timer />,
        part: <KaryawanPage />,
      },
      {
        title: "agenda upacara",
        icon: <Flag />,
        part: <AgendaUpacaraPage />,
      },
      {
        title: "rancang jadwal",
        icon: <CalendarMonth />,
        part: <JadwalPage />,
      },
      {
        title: "kegiatan ekstra",
        icon: <Diversity3 />,
        part: <JadwalPage />,
      },
    ],
  },
  {
    title: "settings",
    icon: <Settings />,
    part: <HomePage />,
  },
];
