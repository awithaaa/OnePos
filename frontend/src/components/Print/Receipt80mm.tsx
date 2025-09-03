import Barcode from "react-barcode";

export default function Receipt80mm({ sale }: { sale: any }) {
  return (
    <div className="w-[80mm] p-2 text-[12px] font-mono">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-lg font-bold">My Shop Pvt Ltd</h1>
        <p>No 123, Main Street, Colombo</p>
        <p>Tel: +94 77 123 4567</p>
        <p>--------------------------------</p>
      </div>

      {/* Info */}
      <div className="mb-2">
        <p>
          <strong>Invoice:</strong> #{sale.id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(sale.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Cashier:</strong> {sale.user.firstName}
        </p>
        <p>
          <strong>Customer:</strong> {sale.customer}
        </p>
      </div>

      {/* Items */}
      {sale.saleItems.map((item: any) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.item.name} x{item.quantity}
          </span>
          <span>{(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
        </div>
      ))}

      <p>--------------------------------</p>

      {/* Total */}
      <div className="flex justify-between font-bold text-sm">
        <span>Total:</span>
        <span>Rs. {sale.total}</span>
      </div>

      {/* Barcode */}
      <div className="flex justify-center mt-3">
        <Barcode value={String(sale.id)} height={40} displayValue={true} />
      </div>

      <p className="text-center mt-2 text-[11px]">Thank you, come again!</p>
    </div>
  );
}
