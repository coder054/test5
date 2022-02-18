import { Text } from 'src/components/Text'

export const InvoiceHistory = () => {
  return (
    <div
      style={{
        boxShadow:
          '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 1px rgba(100, 116, 139, 0.06)',
        backdropFilter: 'blur(68px)',
      }}
      className="bg-[#202128cc] rounded-[8px] "
    >
      <Text name="Header6" className="text-white pt-[32px] px-[24px] mb-2">
        Invoice history
      </Text>

      <Text name="Body2" className="text-Grey px-[24px] pb-[32px] ">
        You can view and download all your previous invoices here. If you’ve
        just made a payment, it may take a few hours for it to appear in the
        table below.
      </Text>

      <div className="hidden ">
        {/* /// header */}
        <div className="bg-Grey flex px-4 py-[10px] ">
          <Text name="Overline" className="text-white ">
            DATE
          </Text>
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="table-auto w-full text-left ">
          <thead className="bg-Grey uppercase ">
            <tr className="text-white">
              <th className="py-[10px] px-[16px] font-semibold text-[12px] leading-[30px] tracking-[0.5px] ">
                DATE
              </th>
              <th className="py-[10px] px-[16px] font-semibold text-[12px] leading-[30px] tracking-[0.5px] ">
                Total (incl. tax)
              </th>
              <th className="py-[10px] px-[16px] font-semibold text-[12px] leading-[30px] tracking-[0.5px] w-[112px] "></th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: '2 Jun 2021', total: 4.99 },
              { date: '2 Jun 2021', total: 4.99 },
              { date: '2 Jun 2021', total: 4.99 },
            ].map((o, index) => (
              <tr key={index}>
                <td className="p-4">
                  <Text name="Body2" className="text-Grey ">
                    {o.date}
                  </Text>
                </td>
                <td className="p-4">
                  <Text name="Body2" className="text-Grey ">
                    {o.total}
                  </Text>
                </td>
                <td className="p-4 text-Blue font-medium text-[14px] leading-[22px] w-[112px] ">
                  View Invoice
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
