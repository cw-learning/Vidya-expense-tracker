import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeColors } from '../../../core/hooks/useThemeColors';
import { Button } from '../../atoms/Button/Button';
import type { ModalProps } from './Modal.types';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { bg, text, border } = useThemeColors();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl ${bg} ${border} border-2 shadow-xl`}
      >
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b-2 ${border} p-4 ${bg}`}
        >
          <h2 id="modal-title" className={`text-xl font-bold ${text}`}>
            {title}
          </h2>
          <Button
            variant="secondary"
            onClick={onClose}
            aria-label="Close modal"
            className="px-3 py-1"
          >
            ✕
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
