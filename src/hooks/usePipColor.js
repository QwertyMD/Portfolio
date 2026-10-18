import { useEffect, useState } from "react";
import { DEFAULT_PIP_COLOR } from "@/lib/colors";

const STORAGE_KEY = "pip-color";

function readStored() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ?? DEFAULT_PIP_COLOR;
}

export default function usePipColor() {
  const [pip, setPip] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.pip = pip;
    window.localStorage.setItem(STORAGE_KEY, pip);
  }, [pip]);

  return [pip, setPip];
}
