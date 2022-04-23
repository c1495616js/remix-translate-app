import { useEffect, useRef } from 'react';
import useDocument from './useDocument';

const usePortal = () => {
  const document = useDocument();

  const portal = useRef(document?.createElement('div'));

  useEffect(() => {
    if (!document) return;
    portal.current = document?.createElement('div');
    const current = portal.current;
    document?.body.appendChild(portal.current);
    return () => void document?.body.removeChild(current);
  }, [document]);

  return portal;
};

export default usePortal;
