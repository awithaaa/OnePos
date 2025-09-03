import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Radio,
  RadioGroup,
  Switch,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: (isPrint: boolean) => void;
  data: { subtotal: number; discount: number; tax: number; total: number };
}

const payment = [
  { name: "Cash", description: "Pay via cash" },
  { name: "Card", description: "Pay via card" },
];

export default function PaymentDialogBox({
  isOpen,
  onClose,
  data,
  onProcess,
}: DialogProps) {
  const [paidAmount, setPaidAmount] = useState<string>();
  const [balance, setBalance] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(payment[0]);
  const [isPrint, setPrint] = useState(true);

  const handleBalance = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const balance = Number(paidAmount) - data.total;
      setBalance(balance.toString());
    }
  };

  const handleProcess = () => {
    onProcess(isPrint);
    onClose();
  };

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
          <div className="flex min-h-full items-center justify-center p-4 ">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment Process
                  <div className="my-2 w-full h-0.5 bg-neutral-200"></div>
                </DialogTitle>

                <div>
                  <div className="font-semibold text-lg mb-2">Payment Type</div>
                  <div className="w-full">
                    <div className="mx-auto w-full max-w-md">
                      <RadioGroup
                        value={selected}
                        onChange={setSelected}
                        aria-label="Server size"
                        className="flex gap-4"
                      >
                        {payment.map((plan) => (
                          <Radio
                            key={plan.name}
                            value={plan}
                            className="group relative flex cursor-pointer rounded-lg bg-white outline-2 px-5 py-2 transition focus:not-data-focus:outline-2 data-checked:bg-white/10 data-focus:outline-2"
                          >
                            <div className="flex gap-2 w-full items-center justify-between">
                              <div className="text-sm/6">
                                <p className="font-semibold ">{plan.name}</p>
                                <div className="-mt-2">
                                  <div>{plan.description}</div>
                                </div>
                              </div>
                              <div className="size-6 fill-black opacity-0 transition group-data-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#000000"
                                >
                                  <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                              </div>
                            </div>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-2 mt-4 w-full h-0.5 bg-neutral-200"></div>
                </div>

                <div className="flex px-2">
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${data.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span>${data.discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (0%)</span>
                      <span>${data.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${data.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Paid amount</span>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(e.target.value)}
                        onKeyDown={handleBalance}
                      />
                    </div>
                    <div className="flex justify-between text-lg ">
                      <span className="font-bold">Balance</span>
                      <input
                        className="text-base rounded-lg px-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                        type="text"
                        value={balance}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Error Box */}
                {error && (
                  <div className="mt-4 p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                    {error}
                  </div>
                )}

                <div className="mt-2 mb-4 flex px-2">
                  <div className="flex items-center justify-center gap-4">
                    <Switch
                      checked={isPrint}
                      onChange={setPrint}
                      className={`${
                        isPrint ? "bg-black" : "bg-white border border-black"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${
                          isPrint
                            ? "translate-x-6 bg-white border border-black"
                            : "translate-x-1 bg-black border border-black"
                        } inline-block h-4 w-4 transform rounded-full transition`}
                      />
                    </Switch>
                    <p className="font-semibold">Print the bill</p>
                  </div>
                </div>

                <div className=" flex flex-col items-center">
                  <div className="mb-4 w-full h-0.5 bg-neutral-200"></div>

                  <button
                    type="button"
                    className="w-[90%] py-2.5 bg-black text-white font-medium rounded-4xl hover:bg-white hover:text-black hover:outline-2  transition cursor-pointer"
                    onClick={handleProcess}
                  >
                    {loading ? "Processing..." : "Process"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
