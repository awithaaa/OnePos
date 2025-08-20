import InfoIcon from "../../assets/arrow_right.svg";

interface Props {
  header?: string[];
  data: any[];
}

export default function InventoryTable({ data }: Props) {
  const columns = [
    { header: "ID", width: "w-1/10" },
    { header: "Quantity", width: "w-1/6" },
    { header: "Stock", width: "w-1/8" },
    { header: "Price", width: "w-1/5" },
    { header: "SalePrice", width: "w-/5" },
    { header: "Actions", width: "w-1/6" },
  ];
  return (
    <>
      <table className="table-fixed w-full  rounded-xl overflow-hidden">
        <thead className="w-full h-10 bg-black rounded-t-lg text-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`${col.width} border border-gray-200 px-4 py-2`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white ">
          {data.map((inv) => (
            <tr key={inv.id} className="border-b border-gray-200">
              <td className="border-r-1 border-l-0 border-gray-200 px-4 py-4 text-center">
                {inv.id}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {`${inv.quantity}`}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {`${inv.stock}`}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {inv.price}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {inv.salePrice}
              </td>
              <td className="border-r-0 border-gray-200 px-4 py-4 flex justify-center">
                <img src={InfoIcon} alt="info" className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
