import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`;

export const formatDate = (date: string) => {
  const obj = new Date(date);

  return obj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
