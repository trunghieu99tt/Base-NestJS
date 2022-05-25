const removeDuplicateObjectInArray = (list) =>
  list.filter((item, index) => {
    const _item = JSON.stringify(item);
    return (
      index ===
      list.findIndex((obj) => {
        return JSON.stringify(obj) === _item;
      })
    );
  });

const formatCurrency = (value: any): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export { removeDuplicateObjectInArray, formatCurrency };
