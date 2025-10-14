import QRCode from "react-qr-code";

type Props = {
  value: string;
  label?: string;
};

export default function QRBadge({ value, label }: Props) {
  return (
    <div className="inline-flex flex-col items-center gap-2 p-4 rounded-lg bg-[--color-secondary]">
      <div className="bg-white p-2 rounded">
        <QRCode value={value} size={128} />
      </div>
      {label && <span className="text-xs text-[--color-text]/70">{label}</span>}
    </div>
  );
}


