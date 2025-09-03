import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import InvoiceA5 from "../../components/Print/InvoiceA5";

export default function PrintBill() {
  const { id } = useParams<{ id: string }>();
  const [isSale, setSale] = useState<any>();
  const [isSaleItems, setSaleItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/sales/${id}`);
        setSale(res.data.sale);
        setSaleItems(res.data.saleItems);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <InvoiceA5 sale={isSale} saleItems={isSaleItems} />
      </div>
    </>
  );
}
