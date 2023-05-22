import { create } from "zustand";
import { IBusinessData } from "../types/hiTableData";
import { useCallback, useMemo } from "react";
import { isEqual } from "lodash";

interface IUseAllBusiness {
  data: IBusinessData;
  setData: (data: object) => void;
}

export const _useAllBusiness = create<IUseAllBusiness>((set) => ({
  data: {},
  setData: (d: any) => set(() => ({ data: d })),
}));

export function useAllBusiness() {
  const { data: _data, setData: _setData } = _useAllBusiness();

  const data = useMemo(() => _data, [_data]);
  const setData = useCallback((d: any) => _setData(d), [_setData]);
  const setState = useCallback(
    (d: any) => {
      if (isEqual(data, d)) return;

      const newData = { ...data, ...d };
      Object.keys(d).forEach((key) => {
        if (!data[key]) {
          newData[key] = d[key];
        }
      });
      _setData((s: any) => ({ ...s, ...newData }));
    },
    [_setData, data]
  )

  return { data, setData, setState };
}

export const intializeAllBusiness=(data)=>{
  _useAllBusiness().setData(data);
}
