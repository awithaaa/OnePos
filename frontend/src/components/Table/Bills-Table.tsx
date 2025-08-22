import { Link } from "react-router-dom";
import InfoIcon from "../../assets/arrow_right.svg";

interface Props {
  header?: string[];
  data: any[];
}

export default function BillTable({ data }: Props) {
  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Customer", width: "w-1/3" },
    { header: "Draft", width: "w-1/6" },
    { header: "Total", width: "w-1/6" },
    { header: "User", width: "w-1/12" },
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
                {item.customer}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.draft || "-"}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.total || "-"}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {item.userId || "-"}
              </td>
              <td className="border-r-0 border-gray-200 px-4 py-4 flex justify-center">
                <Link to={`/dashboard/`}>
                  <img src={InfoIcon} alt="info" className="cursor-pointer" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
