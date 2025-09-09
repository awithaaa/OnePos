import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PinInput from "./PinInput";
import { useNavigate } from "react-router-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordPin({ isOpen, onClose }: DialogProps) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPin, setPin] = useState("");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-600 opacity-80" />
        </TransitionChild>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-2xl overflow-hidden bg-white  shadow-xl transition-all">
                <div>
                  <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {isLoading ? (
                        <div className="w-full text-center">Loading...</div>
                      ) : (
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-900"
                          >
                            Forgot Password Pin
                          </DialogTitle>
                          <div className="mt-4 w-full m-2">
                            <div className="w-full flex justify-center flex-col items-center gap-2">
                              <PinInput onChange={setPin} />
                              <p>Enter the pin send by admin.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={() => navigate("/reset-password")}
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-neutral-900 sm:ml-3 sm:w-auto"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
