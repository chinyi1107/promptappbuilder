"use client";
import React, { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "default" }) {
  const { variant = "default", className = "", disabled, ...rest } = props;

  const baseClass =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

  const variantClass =
    variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} disabled={disabled} {...rest} />
  );
}
