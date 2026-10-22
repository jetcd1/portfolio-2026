type AmbientLightProps = {
  variant?: "thumbnail" | "hero" | "detail";
  warm?: boolean;
  className?: string;
};

/** A slow, non-interactive light field shared across project surfaces. */
export default function AmbientLight({
  variant = "hero",
  warm = false,
  className = "",
}: AmbientLightProps) {
  return (
    <div
      aria-hidden="true"
      className={`ambient-light ambient-light--${variant}${warm ? " ambient-light--warm" : ""} ${className}`}
    >
      <span className="ambient-light__orb ambient-light__orb--one" />
      <span className="ambient-light__orb ambient-light__orb--two" />
      <span className="ambient-light__orb ambient-light__orb--three" />
      <span className="ambient-light__cloud ambient-light__cloud--one" />
      <span className="ambient-light__cloud ambient-light__cloud--two" />
      <span className="ambient-light__wash" />
    </div>
  );
}
