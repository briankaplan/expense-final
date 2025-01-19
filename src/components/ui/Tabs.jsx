import { createContext, useContext, useState } from 'react';

const TabsContext = createContext({
  value: undefined,
  onValueChange: () => {},
});

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className="w-full space-y-4">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return (
    <div className="flex p-1 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
}

export function TabsTrigger({ value: tabValue, children }) {
  const { value, onValueChange } = useContext(TabsContext);
  const isActive = value === tabValue;

  return (
    <button
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${isActive 
          ? 'bg-white text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      onClick={() => onValueChange(tabValue)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: tabValue, children }) {
  const { value } = useContext(TabsContext);
  const isActive = value === tabValue;

  if (!isActive) return null;

  return (
    <div className="mt-4 animate-fadeIn">
      {children}
    </div>
  );
} 