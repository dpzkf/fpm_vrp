import { useMemo } from "react";

type TFilterData<T> = {
  tableData: T[];
  searchValue: string;
  filterCriteria: keyof T;
};

export const useFilterData = <T,>(props: TFilterData<T>) => {
  const { tableData, searchValue, filterCriteria } = props;

  return useMemo(() => {
    if (searchValue) {
      return tableData.filter((el) => (el[filterCriteria] as string).includes(searchValue));
    }
    return tableData;
  }, [searchValue, tableData]);
};
