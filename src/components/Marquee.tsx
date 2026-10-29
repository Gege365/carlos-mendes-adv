const items = [
  "Horas extras e jornada",
  "Demissão e verbas rescisórias",
  "Acidente de trabalho",
  "Assédio moral",
  "Aposentadoria",
  "Auxílio-doença e invalidez",
  "BPC / LOAS",
  "Revisão de benefício",
  "Financiamento abusivo",
  "Despejo e reintegração",
  "Usucapião e escritura",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="marquee border-b border-[var(--line)] bg-[#09090c] py-4">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-sm text-muted"
          >
            {item}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
