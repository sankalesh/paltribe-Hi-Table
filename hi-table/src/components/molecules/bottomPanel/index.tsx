import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo } from "react";
import { RxCross2 } from "react-icons/rx";
import ChoosePortions from "../choosePortions";
import { IDish } from "@/components/types/hiTableData";
import { useCart } from "@/components/store/useCart";
import { handleDishQuantity } from "@/components/organisms/dishDescription/dishQuantityButton";
import ExtraWithDishWithSelect from "../../organisms/dishDescription/extras/variants2";
import { useBottomPanel } from "@/components/store/useBottomPanel";

function BottomPanel({ dishData }: { dishData: IDish }) {
  const { closeBottomPanel, isBottomPanelOpened, openBottomPanel } =
    useBottomPanel();

  const cart = useCart((s) => s.cart);
  const setCart = useCart((s) => s.setCart);

  const closeModal = () => {
    closeBottomPanel(dishData?.id);
  };

  const closeNRemoveCartDish = () => {
    handleDishQuantity(
      cart,
      dishData,
      openBottomPanel,
      setCart,
      closeBottomPanel
    )(cart?.[dishData?.id]?.variants?.length || 0 || 0);
  };

  return (
    <>
      <Transition show={isBottomPanelOpened(dishData?.id)} as={Fragment}>
        <Dialog
          as="div"
          className="relative !z-[99999999]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-base-content bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 h-screen mx-auto mt-10 overflow-y-auto ">
            <div className="w-screen h-56" onClick={closeNRemoveCartDish}></div>
            <div className="flex min-h-full text-center ">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-8"
              >
                <Dialog.Panel className="rounded-t-2xl relative top-0 w-full max-w-md py-3 overflow-auto text-left align-middle transition-all transform bg-base-100 shadow-xl shadow-base-100 min-h-[60vh] mx-auto">
                  <div className="flex flex-col mx-6 mt-4 mb-12 ">
                    <div className="absolute top-4 right-4">
                      <div
                        className="flex flex-row w-10 h-10 mr-auto rounded-full bg-[#2C62F0] on_active_bounce"
                        onClick={closeNRemoveCartDish}
                      >
                        <div className="flex flex-row m-auto">
                          <RxCross2 className="text-3xl text-white " />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4 divide-y-2 divide-base-200">
                      <ChoosePortions dishData={dishData} />

                      <div className="-mx-6">
                        <ExtraWithDishWithSelect dishData={dishData} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="fixed bottom-0 z-20 w-full py-2 rotate-180 shadow-lg bg-base-100 shadow-base-100">
                <div className="flex flex-col mx-auto rotate-180 justify-items-center">
                  <button
                    className={
                      "min-h-[3rem] btn bg-[#2C62F0] btn-md  mx-auto font-semibold text-[1rem] rounded-full shadow-lg min-w-389 min-w-[95%] my-auto !py-2 "
                    }
                  >
                    <span className="my-auto">Add Dish to the cart</span>
                  </button>
                </div>
              </div>
              ;
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default memo(BottomPanel);
