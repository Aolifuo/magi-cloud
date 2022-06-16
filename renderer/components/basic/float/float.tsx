import {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

interface IFloatProps {
  notify?: () => void;
}

const Float: FC<PropsWithChildren<IFloatProps>> = ({ children, notify }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current = document.getElementById("floating-root") as HTMLDivElement;
    setMounted(() => true);
  }, []);

  useEffect(() => {
    if (mounted && notify) {
      notify();
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    children,
    ref.current!,
  );
};

export default Float;
