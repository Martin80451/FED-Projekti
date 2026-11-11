type Order = { id: string; customer: string; total: number; status: string; date: string };

const orders: Order[] = [
  { id: '1', customer: 'Matti Teikäläine', total: 24.5, status: 'New', date: '2026-11-01' },
  { id: '2', customer: 'Maija Ampiaine', total: 12.0, status: 'Completed', date: '2026-10-28' },
];

export default function OrdersPage() {
  return (
    <main>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.date}</td>
              <td>{o.customer}</td>
              <td>{o.total.toFixed(2)} €</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}