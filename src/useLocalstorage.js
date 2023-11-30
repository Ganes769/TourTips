import { useState,useEffect } from "react";
export function useLoacalStorage(initalstate,key)
{
      const[items,setItems]=useState(function(){
      const storedValue=localStorage.getItem(key);
      return JSON.parse(storedValue);
    });
    useEffect(function(){
      localStorage.setItem(key,JSON.stringify(items))
      
    },[items, key])

return [items,setItems]
}