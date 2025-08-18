import InfoIcon from "../../assets/info.svg";

interface Props {
  header?: string[];
  data: any[];
}

export default function Table({ data }: Props) {
  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Name", width: "w-1/5" },
    { header: "Brand", width: "w-1/8" },
    { header: "SUK", width: "w-/6" },
    { header: "Discount", width: "w-/6" },
    { header: "Price", width: "w-1/8" },
    { header: "Sale Price", width: "w-1/8" },
    { header: "Actions", width: "w-1/12" },
  ];
  return (
    <>
      <table className="table-fixed w-full  rounded-t-xl overflow-hidden">
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
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="border-r-1 border-l-0 border-gray-200 px-4 py-4 text-center">
                {item.id}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.name}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.brand || "-"}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.suk || "-"}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.discount || "-"}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.price}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.salePrice}
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
