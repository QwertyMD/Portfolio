export const PIP_COLORS = [
  { id: "green", hex: "#33ff66", label: "GREEN", blip: 880 },
  { id: "amber", hex: "#ffb000", label: "AMBER", blip: 660 },
  { id: "blue", hex: "#8df5ff", label: "BLUE", blip: 990 },
  { id: "white", hex: "#e8f5d6", label: "WHITE", blip: 1040 },
  { id: "red", hex: "#ff3b3b", label: "RED", blip: 560 },
  { id: "pink", hex: "#ff6ec7", label: "PINK", blip: 820 },
];

export const DEFAULT_PIP_COLOR = "green";

export function pipHex(id) {
  return PIP_COLORS.find((c) => c.id === id)?.hex ?? PIP_COLORS[0].hex;
}
