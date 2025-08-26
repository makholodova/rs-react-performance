import styles from './modal.module.css';
import { useEffect, useState } from 'react';

type ModalProps = {
  available: string[];
  selected: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
};

export default function Modal({
  available,
  selected,
  onChange,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  const [local, setLocal] = useState<string[]>(selected);

  const toggle = (k: string) =>
    setLocal((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );

  const onSave = () => {
    onChange(local);
    onClose();
  };

  return (
    <div onMouseDown={onOverlayClick} className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.body}>
          <h3 className={styles.title}>Дополнительные колонки</h3>
          <ul className={styles.content}>
            {available.map((k) => (
              <li key={k}>
                <label>
                  <input
                    type="checkbox"
                    checked={local.includes(k)}
                    onChange={() => toggle(k)}
                  />
                  {k}
                </label>
              </li>
            ))}
          </ul>
          <div className={styles.controls}>
            <button className={styles.button} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.button} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
