import { useState } from "react";

interface useModalReturns {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export function useModal(): useModalReturns {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
  };
}
