import Barcode from "react-barcode";

export default function InvoiceA5({
  sale,
  saleItems,
}: {
  sale: any;
  saleItems: any;
}) {
  if (!sale) {
    return <div>Loading...</div>; // or spinner
  }
  return (
    <div className="w-[148mm] h-[210mm] p-6 text-[14px] font-sans">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">My Shop Pvt Ltd</h1>
        <p>No 123, Main Street, Colombo</p>
        <p>Tel: +94 77 123 4567</p>
        <hr className="my-2" />
        <h2 className="text-xl font-semibold">Invoice</h2>
      </div>

      {/* Info */}
      <div className="mb-4">
        <p>
          <strong>Invoice ID:</strong> #{sale.id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(sale.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Cashier:</strong> {sale.user.firstName} {sale.user.lastName}
        </p>
        <p>
          <strong>Customer:</strong> {sale.customer}
        </p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item</th>
            <th className="text-right p-2">Qty</th>
            <th className="text-right p-2">Price</th>
            <th className="text-right p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map((item: any) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.item.name}</td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">{item.price}</td>
              <td className="p-2 text-right">
                {(item.quantity * parseFloat(item.price)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-between mt-4 font-bold text-lg">
        <span>Total:</span>
        <span>Rs. {sale.total}</span>
      </div>

      {/* Footer with Barcode */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm">Thank you for shopping with us!</p>
        <Barcode value={String(sale.id)} height={60} displayValue={true} />
      </div>
    </div>
  );
}
