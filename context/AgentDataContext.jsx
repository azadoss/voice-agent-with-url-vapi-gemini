// import { createContext } from 'react';

// export const AgentDataContext = createContext({});


import React, { createContext, useState } from 'react';

export const AgentDataContext = createContext({});

export const AgentDataContextProvider = ({ children }) => {
  const [agentInfo, setAgentInfo] = useState(null); // Or your initial value

  return (
    <AgentDataContext.Provider value={{ agentInfo, setAgentInfo }}>
      {children}
    </AgentDataContext.Provider>
  );
};