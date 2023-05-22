import { BiTrash } from "react-icons/bi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {memo} from 'react'

function QuantityPicker({
  quantity,
  setQuantity,
  minQuantity,
  isDeleteAble,
  onDeleteItem,
}: {
  quantity: number;
  setQuantity: (arg1: number) => void;
  minQuantity: number;
  isDeleteAble: boolean;
  onDeleteItem: () => void;
}) {
  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const onDecreaseQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="border-[#2C62F0] !bg-base-100  min-w-[6.044rem] min-h-[2.241rem] flex flex-row mx-1 my-auto border rounded-full !font-medium !text-[0.969rem] ">
      {isDeleteAble && quantity === 0 ? (
        <>
          {/* Delete Item */}
          <button
            className="btn btn-xs btn-outline btn-[#2C62F0]  focus:!bg-transparent active:!bg-transparent w-1/2 !py-0 my-auto flex flex-col border-0 rounded-none rounded-l-full"
            onClick={onDeleteItem}
          >
            <BiTrash className=" font-bold !fill-[#2C62F0]" />
          </button>
        </>
      ) : (
        <>
          {/* Decrease */}
          <button
            className="btn btn-xs btn-outline btn-[#2C62F0]  focus:!bg-transparent active:!bg-transparent w-1/3 !py-0 my-auto flex flex-col border-0 rounded-none rounded-l-full"
            onClick={onDecreaseQuantity}
          >
            <AiOutlineMinus className=" font-bold !fill-[#2C62F0]" />
          </button>

          {/* Quantity */}
          <span
            className={`${
              isDeleteAble && quantity === 0 ? " w-1/2" : " w-1/3"
            } !py-0 px-1 flex flex-col  my-auto mx-auto text-center text-[#2C62F0]`}
          >
            {quantity}
          </span>
        </>
      )}

      {/* Increase */}
      <button
        className="btn btn-xs btn-outline btn-[#2C62F0]  focus:!bg-transparent active:!bg-transparent w-1/3 !py-0 my-auto border-0 flex flex-col rounded-none rounded-r-full "
        onClick={onIncreaseQuantity}
      >
        <AiOutlinePlus className=" font-bold !fill-[#2C62F0]" />
      </button>
    </div>
  );
}
export default memo(QuantityPicker)
