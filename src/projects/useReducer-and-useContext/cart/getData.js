export const getData = async({ url, dispatch, setIsLoading, setIsError, setError }) => {
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
}