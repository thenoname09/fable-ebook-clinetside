import { getUserPayments } from "@/lib/api/user/purchase/data";
import { ServerSideGetUser } from "@/lib/session";
import React from "react";
import PurchaseList from "./PurchaseList";

const PurchaseHistoryPage = async () => {
  const user = await ServerSideGetUser();
  const payments = await getUserPayments(user.id);

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-10 pt-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold text-white mb-6">Payment History</h1>

        <PurchaseList payments={payments} />
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
