import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";

export default function PaymentPopup({
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
          <div className="fixed bottom-0 mx-auto overflow-y-auto bg-black/20 backdrop-blur">
            <div className="w-screen h-[25rem]"></div>
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
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
