import InfoIcon from "../../assets/info.svg";

interface Props {
  header?: string[];
  data: any[];
}

export default function UsersTable({ data }: Props) {
  const columns = [
    { header: "ID", width: "w-1/20" },
    { header: "Name", width: "w-1/3" },
    { header: "Email", width: "w-1/3" },
    { header: "Role", width: "w-/6" },
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
          {data.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="border-r-1 border-l-0 border-gray-200 px-4 py-4 text-center">
                {user.id}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {`${user.firstName} ${user.lastName}`}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {user.email}
              </td>
              <td className="border-r-1 border-gray-200 px-4 py-4">
                {user.role}
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
