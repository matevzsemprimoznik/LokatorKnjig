import { createContext, useEffect, useRef, useState } from 'react';

export enum ModelType {
  _2D = '2D',
  _3D = '3D',
  FIRST_PERSON = 'FIRST_PERSON',
}

export type ModelContextType = {
  modelType: ModelType;
  previousModelType: ModelType;
  setModelType: (modelType: ModelType) => void;
};

export const ModelContext = createContext<ModelContextType>({
  modelType: ModelType._2D,
  previousModelType: ModelType._2D,
  setModelType: () => {},
});

const ModelProvider = ({ children }: any) => {
  const previousModelType = useRef<ModelType>(ModelType._2D);
  const [modelType, setModelTypeState] = useState<ModelType>(ModelType._2D);

  const setModelType = (tempModelType: ModelType) => {
    previousModelType.current = modelType;
    setModelTypeState(tempModelType);
  };

  return (
    <ModelContext.Provider value={{ modelType, setModelType, previousModelType: previousModelType.current }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
