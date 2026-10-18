import vaultBoy from "@/assets/vault-boy.png";
import Typewriter from "@/components/Typewriter";
import { BODY_CONDITION, PROFILE } from "@/data/profile";

const MASK_STYLE = {
  backgroundColor: "var(--pip)",
  WebkitMaskImage: `url(${vaultBoy})`,
  maskImage: `url(${vaultBoy})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export default function StatScreen() {
  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[380px_1fr] lg:grid-rows-1">
      <section aria-label="Dweller" className="pip-panel pip-corners p-5 text-center">
        <figure className="border-2 pip-rule bg-black/40 p-2">
          <div
            role="img"
            aria-label="Vault Boy giving a thumbs up"
            className="mx-auto aspect-[822/829] h-[24vh] max-w-full transition hover:brightness-125"
            style={MASK_STYLE}
          />
        </figure>
        <p className="font-display mt-2 text-3xl tracking-wider pip-glow">{PROFILE.name}</p>
        <p className="text-xs tracking-[0.3em] opacity-70">
          {PROFILE.alias} {"//"} LVL {PROFILE.level} {"//"} {PROFILE.vault}
        </p>
        <div className="mx-auto mt-4 grid max-w-[220px] grid-cols-2 gap-2 text-left text-xs">
          {BODY_CONDITION.map(([part, value]) => (
            <div key={part} className="flex justify-between border pip-rule px-2 py-1">
              <span>{part}</span>
              <span className="tabular">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 inline-block border-2 border-[var(--pip)] px-3 py-1 font-display text-xl tracking-widest pip-glow">
          {PROFILE.status}
        </p>
      </section>

      <section aria-label="Biography" className="pip-panel pip-corners flex flex-col p-5 sm:p-6">
        <h2 className="font-display text-3xl tracking-widest pip-glow">{"// CONDITION & LOG"}</h2>
        <div className="mt-4 flex flex-1 flex-col border-t pip-rule pt-6">
          <Typewriter lines={PROFILE.bio} speed={10} className="space-y-12 text-[15px] sm:text-base" />
        </div>
        <div className="grid gap-2 pt-5 text-xs sm:grid-cols-2">
          <p className="border pip-rule px-3 py-2">KARMA: {PROFILE.karma}</p>
          <p className="border pip-rule px-3 py-2 tabular">CAPS: {PROFILE.caps} {"//"} WEIGHT: SHIPS LIGHT</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Traits">
          {PROFILE.traits.map((t) => (
            <span key={t} className="tag-hover border pip-rule px-3 py-1 text-xs tracking-[0.25em]">
              ◈ {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
