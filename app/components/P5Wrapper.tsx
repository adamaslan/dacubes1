import React, { Suspense, lazy, ComponentType } from 'react';
import LoadingFallback from './LoadingFallback';
import ClientOnly from './ClientOnly';

interface P5WrapperProps {
  component: ComponentType<any>;
  props?: Record<string, any>;
  loadingMessage?: string;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ 
  component: Component, 
  props = {}, 
  loadingMessage = "Loading P5 visualization..." 
}) => {
  return (
    <ClientOnly fallback={<LoadingFallback message={loadingMessage} />}>
      <Suspense fallback={<LoadingFallback message={loadingMessage} />}>
        <Component {...props} />
      </Suspense>
    </ClientOnly>
  );
};

export default P5Wrapper;