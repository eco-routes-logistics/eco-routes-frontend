
import React from 'react';
// @ts-ignore - Fixing "no exported member" errors which occur in some TypeScript environments with react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderDetails } from '../hooks/useOrders';

const Waybill: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useOrderDetails(id as string);
  const order = data?.data?.order;

  if (isLoading) return <div className="p-8 text-center">Loading Waybill...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center gap-8 no-print">
      <div className="w-full max-w-4xl flex justify-between items-center no-print">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold text-slate-700">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Order
        </button>
        <div className="flex gap-4">
          <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg font-bold shadow-sm">Download PDF</button>
          <button onClick={() => window.print()} className="bg-primary text-white px-8 py-2 rounded-lg font-bold shadow-lg">Print Waybill</button>
        </div>
      </div>

      <div className="bg-white w-[595px] min-h-[842px] shadow-2xl p-0 font-sans text-black relative">
        <div className="p-8 border-b-4 border-black flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <span className="material-symbols-outlined text-black text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
               <span className="text-2xl font-black uppercase tracking-tighter">EcoRoute LTD</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">Premium Green Logistics</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-gray-400 uppercase">Ship Date</div>
            <div className="text-sm font-bold">24 OCT 2023</div>
            <div className="text-[10px] font-black text-gray-400 uppercase mt-3">Weight</div>
            <div className="text-sm font-bold uppercase">5.0 KG / 11.0 LBS</div>
          </div>
        </div>

        <div className="p-8 border-b-4 border-black flex flex-col items-center gap-4 bg-gray-50">
          <div className="h-20 w-full max-w-[400px] bg-black p-1">
             <div className="w-full h-full bg-white flex items-center justify-center font-mono text-3xl font-black tracking-[1em] pl-[1em]">
                {id || 'ORD-3492'}
             </div>
          </div>
          <span className="text-sm font-mono font-black tracking-[0.5em]">{id || 'ORD-3492'}-ER-NG</span>
        </div>

        <div className="grid grid-cols-2 border-b-4 border-black">
          <div className="p-8 border-r-4 border-black h-full">
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-3">From (Sender)</h3>
            <div className="text-base font-black mb-1">{order.businessClient}</div>
            <div className="text-sm leading-tight font-medium">
              Registered Partner
            </div>
            <div className="mt-4 text-xs font-bold font-mono"></div>
          </div>
          <div className="p-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-3">To (Receiver)</h3>
            <div className="text-base font-black mb-1">{order.customer}</div>
            <div className="text-sm leading-tight font-medium">
              {order.customerLocation}
            </div>
            <div className="mt-4 text-xs font-bold font-mono">{order.customerPhone}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b-4 border-black text-center">
          <div className="p-6 border-r-4 border-black">
            <div className="text-[10px] font-black text-gray-400 uppercase">Service Type</div>
            <div className="text-lg font-black mt-1">Standard</div>
          </div>
          <div className="p-6 border-r-4 border-black">
            <div className="text-[10px] font-black text-gray-400 uppercase">Packaging</div>
            <div className="text-lg font-black mt-1">Box</div>
          </div>
          <div className="p-6">
            <div className="text-[10px] font-black text-gray-400 uppercase">Total Pieces</div>
            <div className="text-lg font-black mt-1">1 / 1</div>
          </div>
        </div>

        <div className="p-8 border-b-4 border-black bg-white">
          <div className="flex justify-between items-start">
             <div className="max-w-[70%]">
                <h3 className="text-[10px] font-black text-gray-400 uppercase mb-1">Content Description</h3>
                <div className="text-xl font-black mb-1 leading-tight">{order.description || order.weight + ' Package'}</div>
                <p className="text-xs font-bold text-gray-500 italic">{order.specialInstructions}</p>
             </div>
             <div className="text-right">
                <h3 className="text-[10px] font-black text-gray-400 uppercase mb-1">Value</h3>
                <div className="text-xl font-black">{order.value}</div>
             </div>
          </div>
        </div>

        <div className="p-8 bg-black text-white text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl">verified_user</span>
          <h2 className="text-2xl font-black uppercase tracking-widest">OTP Verification Required</h2>
          <p className="text-[11px] font-bold text-gray-300 max-w-sm leading-tight uppercase">
            Driver must verify secure 4-digit PIN with receiver before handover.
          </p>
        </div>

        <div className="p-8 flex justify-between items-end bg-white absolute bottom-0 w-full">
          <div className="flex flex-col">
            <div className="text-[10px] font-black text-gray-400 uppercase">Routing Lane</div>
            <div className="text-4xl font-black tracking-tighter">LOS-VI-01</div>
          </div>
          <div className="size-28 border-4 border-black p-2 flex items-center justify-center">
             {/* Abstract QR code look */}
             <div className="w-full h-full bg-black flex flex-wrap gap-1 p-1">
                <div className="w-[45%] h-[45%] bg-white p-1"><div className="w-full h-full bg-black"></div></div>
                <div className="w-[45%] h-[45%] bg-white p-1"><div className="w-full h-full bg-black"></div></div>
                <div className="w-[45%] h-[45%] bg-white p-1"><div className="w-full h-full bg-black"></div></div>
                <div className="w-[45%] h-[45%] bg-black"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waybill;
