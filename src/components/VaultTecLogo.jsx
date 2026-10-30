import logo from "@/assets/logo.png";
import { maskStyle } from "@/lib/maskStyle";

export default function VaultTecLogo({ className, "aria-hidden": ariaHidden, ...rest }) {
  return (
    <div
      className={className}
      style={maskStyle(logo)}
      {...(ariaHidden
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "Vault-Tec Industries" })}
      {...rest}
    />
  );
}
