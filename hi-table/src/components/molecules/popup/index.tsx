import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";

export default function Popup({
  children,
  show,
  onClose,
}: {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed bottom-0 mx-auto mt-10 overflow-y-auto backdrop-blur-sm">
          <div className="fixed inset-0 opacity-20 bg-black/10"></div>
            <div className="w-screen h-[35rem]"></div>
            <div className="flex min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-8"
              >
                <Dialog.Panel className="rounded-t-2xl relative top-0 w-full max-w-md py-3 overflow-auto text-left align-middle transition-all transform bg-white shadow-xl shadow-base-100 min-h-[50vh] mx-auto">
                  <div className="absolute z-20 top-4 right-4">
                    <div
                      className="flex flex-row w-10 h-10 mr-auto rounded-full on_active_bounce"
                      onClick={onClose}
                    >
                      <div className="flex flex-row m-auto">
                        <RxCross2 className="text-2xl text-black " />
                      </div>
                    </div>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
              <div className="fixed bottom-0 z-20 w-full py-2 shadow-lg shadow-base-100">
                <button className="py-4 w-[85%] space-x-2 text-white bg-[#2C62F0] rounded-full">
                  Mark all as delivered
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
