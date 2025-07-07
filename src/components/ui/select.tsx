"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return <div className="relative inline-block w-full">{children}</div>;
}

export function SelectTrigger({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-gray-300 rounded px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string; children?: ReactNode }) {
  return <span className="block truncate">{placeholder}</span>;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return (
    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto">
      {children}
    </ul>
  );
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  // For demo, no keyboard navigation or aria roles
  return (
    <li
      onClick={() => {
        // no direct handler here, you need to wrap SelectContent with logic
      }}
      className="cursor-pointer px-3 py-2 hover:bg-blue-100"
    >
      {children}
    </li>
  );
}
