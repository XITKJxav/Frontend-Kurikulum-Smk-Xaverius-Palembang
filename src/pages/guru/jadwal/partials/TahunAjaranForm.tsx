import { ActionButton } from "@components/Button";
import ReactDatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import useUpdateTahunAjaran from "../UpdateTahunAjaran/hook/useUpdateTahunAjaran";
import { useEffect } from "react";

const TahunAjaranForm = () => {
  const { control } = useFormContext();
  const { handleUpdateTahunAjaran, fetchTahunAjaranRequest } =
    useUpdateTahunAjaran();

  useEffect(() => {
    fetchTahunAjaranRequest();
  }, []);

  return (
    <form className="w-full mt-3 mb-3 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">
            Tahun Ajaran Awal
          </label>
          <Controller
            name="tahun_ajaran_awal"
            control={control}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <>
                <ReactDatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Pilih tahun"
                  className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                    fieldState.error
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                  popperClassName="bg-white z-50 shadow-lg rounded-md border border-gray-200 p-2"
                  ref={(ref) => {
                    field.ref({
                      focus: () => {
                        try {
                          ref?.input?.focus?.();
                        } catch (_) {}
                      },
                    });
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-semibold text-gray-700">
            Tahun Ajaran Akhir
          </label>
          <Controller
            name="tahun_ajaran_akhir"
            control={control}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <>
                <ReactDatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Pilih tahun"
                  className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                    fieldState.error
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                  popperClassName="bg-white z-50 shadow-lg rounded-md border border-gray-200 p-2"
                  ref={(ref) => {
                    field.ref({
                      focus: () => {
                        try {
                          ref?.input?.focus?.();
                        } catch (_) {}
                      },
                    });
                  }}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div>
        <ActionButton
          label="Update Tahun Ajaran"
          color="primary"
          className="font-medium text-white"
          onClick={handleUpdateTahunAjaran}
        />
      </div>
    </form>
  );
};

export default TahunAjaranForm;
