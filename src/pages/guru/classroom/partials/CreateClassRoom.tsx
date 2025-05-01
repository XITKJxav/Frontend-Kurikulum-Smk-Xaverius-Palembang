import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, FormControl, MenuItem, TextField } from "@mui/material";
import ErrorMessage from "@components/ErrorMessage";
import useClassRoom from "../Create/hook/useClassRoom";
import { useEffect } from "react";
import { useClassroompageContext } from "../context";
import useGetClassRoom from "../LIst/hook/useGetClassRoom";
import { Filters } from "../LIst/utils/Filters";

const CreateClassRoom = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useClassRoom();
  const { state } = useClassroompageContext();
  const { jurusanRequest } = state;

  const romanOptions = [
    { value: "X", label: "10" },
    { value: "XI", label: "11" },
    { value: "XII", label: "12" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%]">
        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="nomor_ruangan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth size="small" error={!!fieldState.error}>
                  <TextField
                    {...field}
                    select
                    label="Pilih Ruangan"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    variant="outlined"
                  >
                    {romanOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <ErrorMessage messageError={fieldState.error?.message} />
              </>
            )}
          />
        </div>

        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="kd_jurusan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth size="small" error={!!fieldState.error}>
                  <Autocomplete
                    options={jurusanRequest}
                    getOptionLabel={(option) => option?.nama_jurusan || ""}
                    value={
                      jurusanRequest.find(
                        (item) => item.kd_jurusan === field.value
                      ) || null
                    }
                    onChange={(_, value) =>
                      field.onChange(value ? value.kd_jurusan : "")
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.kd_jurusan === value?.kd_jurusan
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pilih Jurusan"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>

                <ErrorMessage messageError={fieldState.error?.message} />
              </>
            )}
          />
        </div>

        <ActionButton
          label="Submit"
          onClick={handleSubmitForm}
          color="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CreateClassRoom;
