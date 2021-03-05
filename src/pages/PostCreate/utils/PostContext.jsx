import React, {createContext, useContext, useState} from 'react';

const FormContext = createContext();

function FormProvider({children}) {
  const [formValues, setFormValues] = useState();

  return (
    <FormContext.Provider value={[formValues, setFormValues]}>
      {children}
    </FormContext.Provider>
  );
}

function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

export {FormProvider, useFormContext};
