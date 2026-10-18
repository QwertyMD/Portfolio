export const PIP_COLORS = [
  { id: "green", hex: "#33ff66", label: "GREEN" },
  { id: "amber", hex: "#ffb000", label: "AMBER" },
  { id: "blue", hex: "#8df5ff", label: "BLUE" },
  { id: "white", hex: "#e8f5d6", label: "WHITE" },
];

export const DEFAULT_PIP_COLOR = "green";

export function pipHex(id) {
  const match = PIP_COLORS.find((c) => c.id === id);
  return match ? match.hex : PIP_COLORS[0].hex;
}
