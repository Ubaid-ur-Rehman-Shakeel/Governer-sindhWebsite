import { TFields } from "@/types";
import type { KeyboardEvent, ChangeEvent } from "react";

export default function Input({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}: {
  id: TFields;
  placeholder: string;
  type: "text" | "number" | "email" | "date" | "tel";
  required?: boolean;
  register: any;
  errors: any;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!numericKeys.includes(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="my-6">
      <label htmlFor={id} className="mb-6 mt-4 text-slate-700 md:text-xl">
        {placeholder} {required ? "*" : "(optional)"}
      </label>

      <div className={`${id === "phoneNumber" ? "mb-2 mt-1 flex" : ""}`}>
        {id === "phoneNumber" ? (
          <div className="flex h-12 w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-gray-400 bg-gray-100 p-3 text-gray-400 xs:w-[10%] md:text-xl">
            +92
          </div>
        ) : (
          ""
        )}

        <input
          type={type}
          // inputMode={ id === "cnic" || id === "phoneNumber" ? 'tel':''}
          onKeyDown={
            id === "cnic" || id === "phoneNumber" ? handleKeyDown : () => {}
          }
          id={id}
          maxLength={id === "cnic" ? "13" : id === "phoneNumber" ? 10 : ""}
          max={type === "date" ? `${new Date().getFullYear() - 13}-12-29` : ""}
          className={`block h-12 w-full border border-gray-400 bg-gray-100 p-3 ${
            errors?.[id]
              ? "border-red-400 ring-red-500"
              : "focus:border-sub focus:ring-sub"
          } outline-none focus:ring-1 md:text-xl ${
            id === "phoneNumber" ? "rounded-r" : "mb-2 mt-1 rounded"
          }`}
          placeholder={` ${placeholder}`}
          {...register(id, {
            valueAsNumber: id === "cnic" || id === "phoneNumber" ? true : false,
          })}
        />
      </div>
      {errors?.[id] && (
        <p className="mb-4 text-red-400">{errors?.[id]?.message}</p>
      )}
    </div>
  );
}
