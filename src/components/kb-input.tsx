"use client";

import { useId } from "react";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  /** parchment labels for dusk backgrounds */
  tone?: "dusk" | "parchment";
};

const labelTone = {
  dusk: "text-kb-dusk/70",
  parchment: "text-kb-parchment/70",
};
const inputTone = {
  dusk: "text-kb-dusk border-kb-chalk",
  parchment: "text-kb-parchment border-kb-parchment/30",
};

/** Border-bottom-only input with a Terracotta focus state and a real label. */
export function KBInput({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
  tone = "dusk",
}: FieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`kb-label text-[12px] ${labelTone[tone]}`}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`w-full bg-transparent border-0 border-b-[0.5px] ${inputTone[tone]} pb-2 font-body text-[15px] font-light outline-none transition-colors duration-300 placeholder:text-current/40 focus:border-kb-terracotta`}
      />
    </div>
  );
}

/** Matching textarea variant. */
export function KBTextarea({
  label,
  name,
  required,
  tone = "dusk",
}: Omit<FieldProps, "type">) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`kb-label text-[12px] ${labelTone[tone]}`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        className={`w-full resize-none bg-transparent border-0 border-b-[0.5px] ${inputTone[tone]} pb-2 font-body text-[15px] font-light outline-none transition-colors duration-300 focus:border-kb-terracotta`}
      />
    </div>
  );
}

/** Matching select variant. */
export function KBSelect({
  label,
  name,
  required,
  options,
  tone = "dusk",
}: Omit<FieldProps, "type"> & { options: string[] }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={`kb-label text-[12px] ${labelTone[tone]}`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={`w-full bg-transparent border-0 border-b-[0.5px] ${inputTone[tone]} pb-2 font-body text-[15px] font-light outline-none transition-colors duration-300 focus:border-kb-terracotta`}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-kb-dusk">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
