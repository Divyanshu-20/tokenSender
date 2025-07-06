"use client";
import React from "react";
import { IconType } from "react-icons";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  icon?: IconType;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  isTextArea = false,
  icon: Icon,
}) => {
  const inputClass = `w-full px-4 py-3 text-[15px] bg-gray-800/80 border border-white/5 rounded-xl transition-transform duration-150 text-white placeholder-gray-400/60 ${
    Icon ? 'pl-12' : ''
  } hover:border-white/10 focus:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/5 focus:shadow-lg focus:shadow-blue-500/10 hover:scale-105 focus:scale-105 hover:brightness-105 focus:brightness-110`;
  const iconClass = "absolute left-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300";
  const iconTop = isTextArea ? 'top-10' : 'top-9 group-hover:scale-110 transition-transform duration-300';

  return (
    <div className="mb-4 relative group transition-transform duration-150 hover:scale-105 focus-within:scale-105 hover:brightness-105 focus-within:brightness-110">
      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">{label}</label>
      {Icon && (
        <div className={`${iconClass} ${iconTop} group-hover:animate-pulse`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      {isTextArea ? (
        <textarea 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
          rows={4}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  );
};