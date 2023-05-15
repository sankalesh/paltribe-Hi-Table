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
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 h-screen mx-auto mt-10 overflow-y-auto ">
            <div className="w-screen h-56"></div>
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
                <Dialog.Panel className="rounded-t-2xl relative top-0 w-full max-w-md py-3 overflow-auto text-left align-middle transition-all transform bg-white shadow-xl shadow-base-100 min-h-[60vh] mx-auto">
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
              <div className="fixed bottom-0 z-20 w-full py-2 shadow-lg bg-base-100 shadow-base-100">
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
