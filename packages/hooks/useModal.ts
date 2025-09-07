import { useCallback, useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return { open, show, hide };
};
