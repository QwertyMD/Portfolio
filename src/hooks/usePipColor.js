import { useEffect, useState } from "react";
import { DEFAULT_PIP_COLOR, PIP_COLORS } from "@/lib/colors";

const STORAGE_KEY = "pip-color";
const IDS = new Set(PIP_COLORS.map((c) => c.id));

function readStored() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return IDS.has(stored) ? stored : DEFAULT_PIP_COLOR;
}

export default function usePipColor() {
  const [pip, setPip] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.pip = pip;
    window.localStorage.setItem(STORAGE_KEY, pip);
  }, [pip]);

  return [pip, setPip];
}
