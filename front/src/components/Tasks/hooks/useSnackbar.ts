import { useState } from "react";

interface useSnackbarReturns {
  isOpen: boolean;
  open: (message: string) => void;
  close: () => void;
  message: string;
}

export function useSnackbar(): useSnackbarReturns {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function open(msg: string) {
    setMessage(msg);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return {
    isOpen,
    open,
    close,
    message,
  };
}
