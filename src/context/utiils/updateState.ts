type TUpdateState = {
  id: string;
};

export const updateState = <T extends TUpdateState>(items: T[], id: string, updatedData: Partial<T>) => {
  const itemIndex = items.findIndex((loc) => loc.id === id);

  if (itemIndex === -1) {
    return items;
  }
  const updatedItems = [...items];
  updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...updatedData };
  return updatedItems;
};
