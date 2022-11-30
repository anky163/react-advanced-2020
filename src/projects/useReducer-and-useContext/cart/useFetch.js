import { useState, useEffect, useReducer, useCallback } from 'react'
import { reducer } from './reducer';

export const useFetch = (url) => {  
  const [bag, dispatch] = useReducer(reducer, { totalAmount: 0 });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState('');

  const getData = useCallback(async() => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
          const message = `${response.status} ${response.statusText}`;
          throw new Error(message);
      } 

      const data = await response.json();

      const newBag = data.reduce((result, item) => {
        result.totalAmount += item.amount;
        result.totalPrice += parseFloat(item.price) * item.amount;
        result.items.push(item);
        return result;
      }, { items: [], totalAmount: 0, totalPrice: 0 });

      dispatch({ type: 'UPDATE_BAG', payload: newBag });
      setIsLoading(false);
      setIsError(false);
    } 
    catch(err) {
      setIsLoading(false);
      setError(`${err}`);
    }
  }, [url])

  useEffect(() => {
    document.title = `Yotsuba's bag (${ bag.totalAmount })`;
  }, [bag.totalAmount]);

  useEffect(() => {
    getData(url);
  }, [url, getData]);

  return { bag, dispatch, isLoading, isError, error };
}