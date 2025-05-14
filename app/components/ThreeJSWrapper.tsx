import React, { Suspense, lazy, ComponentType } from 'react';
import LoadingFallback from './LoadingFallback';
import ClientOnly from './ClientOnly';

interface ThreeJSWrapperProps {
  component: ComponentType<any>;
  props?: Record<string, any>;
  loadingMessage?: string;
}

const ThreeJSWrapper: React.FC<ThreeJSWrapperProps> = ({ 
  component: Component, 
  props = {}, 
  loadingMessage = "Loading 3D visualization..." 
}) => {
  return (
    <ClientOnly fallback={<LoadingFallback message={loadingMessage} />}>
      <Suspense fallback={<LoadingFallback message={loadingMessage} />}>
        <Component {...props} />
      </Suspense>
    </ClientOnly>
  );
};

export default ThreeJSWrapper;