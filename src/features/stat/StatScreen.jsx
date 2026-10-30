import vaultBoy from "@/assets/vault-boy.png";
import Typewriter from "@/components/Typewriter";
import { Caret, Diamond, DoubleSlash, IconHeart } from "@/components/icons";
import { PROFILE } from "@/features/stat/profile";
import { maskStyle } from "@/lib/maskStyle";

const STATUS = PROFILE.status.split(" // ");

export default function StatScreen() {
  return (
    <div className="grid gap-4 lg:h-full lg:grid-cols-[380px_1fr] lg:grid-rows-1">
      <section aria-label="Dweller" className="pip-panel pip-corners p-5 text-center">
        <figure className="border-2 pip-rule bg-black/40 p-2">
          <div
            role="img"
            aria-label="Vault Boy giving a thumbs up"
            className="mx-auto aspect-[822/829] h-[24vh] max-w-full transition hover:brightness-125"
            style={maskStyle(vaultBoy, "var(--pip)")}
          />
        </figure>
        <p className="font-display mt-2 text-3xl tracking-wider pip-glow">{PROFILE.name}</p>
        <p className="text-lg tracking-[0.3em] opacity-70 sm:text-xl">
          {PROFILE.alias} <DoubleSlash className="opacity-70" /> LVL {PROFILE.level}
        </p>
        <p className="mt-4 inline-block border-2 border-[var(--pip)] px-3 py-1 font-display text-xl tracking-widest pip-glow">
          {STATUS.map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </p>
      </section>

      <section aria-label="Biography" className="pip-panel pip-corners flex flex-col p-5 sm:p-6">
        <h2 className="font-display flex items-center gap-2 text-3xl tracking-widest pip-glow">
          <IconHeart />
          PERSONNEL FILE
        </h2>
        <div className="mt-4 flex flex-1 flex-col border-t pip-rule pt-6">
          <Typewriter
            lines={PROFILE.bio}
            speed={10}
            bullet={<Caret className="mr-2 opacity-90" />}
            className="space-y-10 text-base sm:text-lg"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Traits">
          {PROFILE.traits.map((t) => (
            <span key={t} className="tag-hover border pip-rule px-3.5 py-1.5 text-sm tracking-[0.2em]">
              <Diamond className="mr-1.5 opacity-90" />
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
