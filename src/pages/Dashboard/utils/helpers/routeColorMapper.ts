export const routeColorMapper = (index: number) => {
  const colors = ["var(--first-vehicle)", "var(--second-vehicle)", "var(--third-vehicle)"];
  return colors[index] || "var(--first-vehicle)";
};
