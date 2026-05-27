import React from 'react';
import { FlaskConical, HeartPulse, Microscope, Pill, Stethoscope, Syringe, Tablets } from 'lucide-react';

const orbitIcons = [
  { Icon: Pill, className: 'node-a' },
  { Icon: Syringe, className: 'node-b' },
  { Icon: FlaskConical, className: 'node-c' },
  { Icon: Stethoscope, className: 'node-d' },
  { Icon: Tablets, className: 'node-e' },
  { Icon: Microscope, className: 'node-f' },
];

export default function MedicineScene({ className = '' }) {
  return (
    <div className={`medicine-scene ${className}`} aria-hidden="true">
      <div className="medicine-disc disc-one" />
      <div className="medicine-disc disc-two" />
      <div className="medicine-core">
        <HeartPulse size={54} strokeWidth={1.7} />
      </div>
      <div className="medicine-ring ring-one" />
      <div className="medicine-ring ring-two" />
      {orbitIcons.map(({ Icon, className: nodeClass }) => (
        <div className={`medicine-node ${nodeClass}`} key={nodeClass}>
          <Icon size={22} strokeWidth={1.8} />
        </div>
      ))}
    </div>
  );
}
