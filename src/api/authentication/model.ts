export type KaryawanSignInResponseRequestModel = {
  kd_karyawan: string;
  name: string;
  role: string;
  access_token: string;
  refresh_token: string;
};

export type siswaSignInResponseRequestModel = {
  kd_siswa: string;
  name: string;
  role: string;
  id_ruang_kelas: string;
  access_token: string;
  refresh_token: string;
};

export type SignInRequestModel = {
  email: string;
  password: string;
};

export type resetPasswordModel = {
  email: string;
  otp: string;
};

export type SendVerificationCodeModel = {
  email: string;
};
