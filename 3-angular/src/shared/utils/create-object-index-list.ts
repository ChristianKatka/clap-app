export const createObjectIndexList = (items: any[]) => {
 return items.reduce(
    (items: { [id: string]: any }, item: any) => ({
      ...items,
      [item.id]: item,
    }),
    {}
  );
};
