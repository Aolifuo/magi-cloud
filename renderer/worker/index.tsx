import { FC, useEffect } from 'react';
import Float from '@/components/basic/float/float';

const BackgroundWorker: FC = () => {

  useEffect(() => {
    const worker = new Worker(new URL('worker/main.ts', import.meta.url));
    worker.postMessage('fuck you');
    return () => worker.terminate();
  }, []);

  return (
    <Float>
      <div />
    </Float>
  );
};

export default BackgroundWorker;