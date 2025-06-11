import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInKaryawanRequestModel } from "@api/authentication/model";

export const karyawanSigninreqDefaultValues: SignInKaryawanRequestModel = {
  niy: "",
  password: "",
};

export const karyawanSignInValidations = yupResolver(
  yup.object().shape({
    niy: yup.string().required("niy is required"),
    password: yup.string(),
  })
);

export const karyawanSignInDetailsFormatter = (
  data: SignInKaryawanRequestModel
): SignInKaryawanRequestModel => {
  return {
    niy: data.niy,
    password: data.password,
  };
};
