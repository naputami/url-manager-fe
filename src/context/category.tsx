// "use client";
// import React, { createContext, useState, useContext } from "react";

// type CategoryContextProps = {
// 	children: React.ReactNode
// }

// const CategoryContext = createContext('');

// export const CategoryContextProvider = ({ children }: CategoryContextProps) => {
//     const [copiedCommunityId, setCopiedCommunityId] = useState("");
  
//     return (
//       <CategoryContext.Provider
//         value={{ copiedCommunityId, setCopiedCommunityId }}
//       >
//         {children}
//       </CategoryContext.Provider>
//     );
//   };
  
//   export const useCommunityContext = () => useContext(CategoryContext);