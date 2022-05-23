import { createContext, useEffect, useState } from 'react';

export enum ModelType {
  _2D ='2D' ,
  _3D = '3D'
};

export type ModelContextType = {
  modelType: ModelType;
  setModelType: (modelType: ModelType) => void;
};

export const ModelContext = createContext<ModelContextType>({ modelType: ModelType._3D, setModelType: () => {} });

const ModelProvider = ({ children }: any) => {
  const [modelType, setModelType] = useState<ModelType>(ModelType._3D);
  console.log(modelType)

  return <ModelContext.Provider value={{ modelType, setModelType }}>{children}</ModelContext.Provider>;
};

export default ModelProvider;
