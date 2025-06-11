import {
  Home,
  CalendarMonth,
  Settings,
  School,
  Class,
  SupervisorAccount,
  Work,
  MeetingRoom,
  AutoStories,
  Timer,
  Foundation,
  Flag,
  Diversity3,
} from "@mui/icons-material";
import AgendaUpacaraPage from "@pages/guru/agendaupacara";
import ClassCoordinatorPage from "@pages/guru/classcoordinator";
import ClassRoomPage from "@pages/guru/classroom";
import DurasiUpacaraPage from "@pages/guru/durasiupacara";
import EkstrakurikulerPage from "@pages/guru/ekstrakurikuler";
import HomePage from "@pages/guru/homepage";
import JadwalPage from "@pages/guru/jadwal";
import JadwalPembelajaranPage from "@pages/guru/jadwalpembelajaran";
import JadwalPiketPage from "@pages/guru/jadwalpiket";
import KaryawanPage from "@pages/guru/karyawan";
import JurusanPage from "@pages/guru/managejurusan";
import MataPelajaranPage from "@pages/guru/matapelajaran";

export const listMenuGuru = [
  {
    title: "home",
    icon: <Home />,
    part: <HomePage />,
    role: ["kurikulum", "kepalasekolah", "guru"],
  },
  {
    titleDropDown: "Prasarana",
    icon: <Foundation />,
    role: ["kurikulum", "kepalasekolah"],
    children: [
      {
        title: "manage jurusan",
        icon: <School />,
        part: <JurusanPage />,
        role: ["kurikulum", "kepalasekolah"],
      },

      {
        title: "ruang kelas",
        icon: <MeetingRoom />,
        part: <ClassRoomPage />,
        role: ["kurikulum", "kepalasekolah"],
      },
    ],
  },
  {
    titleDropDown: "Akademik",
    icon: <Class />,
    role: ["kurikulum", "kepalasekolah", "guru"],
    children: [
      {
        title: "karyawan",
        icon: <Work />,
        part: <KaryawanPage />,
        role: ["kurikulum", "kepalasekolah"],
      },
      {
        title: "siswa",
        icon: <SupervisorAccount />,
        part: <ClassCoordinatorPage />,
        role: ["kurikulum", "kepalasekolah"],
      },
      {
        title: "mata pelajaran",
        icon: <AutoStories />,
        part: <MataPelajaranPage />,
        role: ["kurikulum", "kepalasekolah"],
      },
      {
        title: "jadwal pembelajaran",
        icon: <CalendarMonth />,
        part: <JadwalPembelajaranPage />,
        role: ["kurikulum", "guru"],
      },
      {
        title: "jadwal piket",
        icon: <CalendarMonth />,
        part: <JadwalPiketPage />,
        role: ["kurikulum", "guru"],
      },
    ],
  },
  {
    titleDropDown: "manage jadwal",
    icon: <CalendarMonth />,
    role: ["kurikulum", "kepalaSekolah"],
    children: [
      {
        title: "durasi pembelajaran",
        icon: <Timer />,
        part: <DurasiUpacaraPage />,
        role: ["kurikulum", "kepalaSekolah"],
      },
      {
        title: "agenda upacara",
        icon: <Flag />,
        part: <AgendaUpacaraPage />,
        role: ["kurikulum", "kepalaSekolah"],
      },
      {
        title: "rancang jadwal",
        icon: <CalendarMonth />,
        part: <JadwalPage />,
        role: ["kurikulum", "kepalaSekolah"],
      },
      {
        title: "kegiatan ekstra",
        icon: <Diversity3 />,
        part: <EkstrakurikulerPage />,
        role: ["kurikulum", "kepalaSekolah"],
      },
    ],
  },
  {
    title: "settings",
    icon: <Settings />,
    part: <HomePage />,
    role: ["kurikulum", "kepalaSekolah", "guru"],
  },
];
