import React from 'react';
import useOutsideCloser from '@/hooks/use-outside-closer';
import { Icons } from '@/components/icons';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  color?: [number, number, number];
}

export const Modal = ({ children, isOpen, onClose, color }: ModalProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideCloser(ref, () => {
    onClose();
  });

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-40 blurry-background`}
        >
          <div
            ref={ref}
            className={`bg-white m-2 relative dark:bg-black rounded-md shadow-xl transform transition-transform duration-300 z-50 `}
          >
            <div
              style={{
                backgroundColor: `rgba(${color}, 0.3)`,
              }}
              className='flex h-full w-full p-8 rounded-md overflow-y-auto max-h-[85vh]'
            >
              {children}
            </div>
            <div>
              <button
                className='absolute top-0 right-0 m-2 h-8 w-8 flex items-center justify-center group/button'
                onClick={() => onClose()}
              >
                <Icons.close className='w-5 group-hover/button:scale-125 transition-transform' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};