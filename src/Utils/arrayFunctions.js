//determina cuantos elementos del mismo tipo tenemos en el carrito
export const countDuplicatesItemArray = (value, array) => {
  let count = 0;

  array.forEach((arrayValue) => {
    if (arrayValue == value) {
      count++;
    }
  });

  return count;
};

//para saber cuantos producto unicos hay en el carrito
export const removeArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

//Elimina producto del carrito
export const removeItemArray = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};
