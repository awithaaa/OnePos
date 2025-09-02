import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function BillEdit() {
  const { id } = useParams<{ id: string }>();
  const [isData, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/sales/${id}`);
      console.log(res.data);
      setData(res);
      console.log(isData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>Bill id: {id}</div>
    </>
  );
}
