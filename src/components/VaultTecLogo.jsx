import logo from "@/assets/logo.png";

const LOGO_MASK = {
  backgroundColor: "currentColor",
  WebkitMaskImage: `url(${logo})`,
  maskImage: `url(${logo})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export default function VaultTecLogo({ className }) {
  return <div role="img" aria-label="Vault-Tec Industries" className={className} style={LOGO_MASK} />;
}
