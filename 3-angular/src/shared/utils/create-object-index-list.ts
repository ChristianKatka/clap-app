export const createObjectIndexList = (items: any[]) => {
  if (!items) return {};
  return items.reduce(
    (items: { [id: string]: any }, item: any) => ({
      ...items,
      [item.id]: item,
    }),
    {}
  );
};
