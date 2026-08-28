"use client";

import { Table } from '@heroui/react';
import React from 'react';
import { FiBookOpen } from 'react-icons/fi';

const STATUS_STYLES = {
  completed: "bg-emerald-500/10 text-emerald-400",
  pending: "bg-yellow-500/10 text-yellow-400",
  failed: "bg-red-500/10 text-red-400",
};

const PurchaseList = ({ payments }) => {
  if (!payments?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
        <FiBookOpen size={32} className="text-zinc-700" />
        <p className="text-sm text-center">No payment records found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile — stacked cards */}
      <div className="sm:hidden space-y-3">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 space-y-2.5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium text-white truncate">
                {payment.ebookTitle || "Untitled"}
              </span>
              <span
                className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  STATUS_STYLES[payment.status] || "bg-zinc-800 text-zinc-400"
                }`}
              >
                {payment.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                {payment.createdAt
                  ? new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </span>
              <span className="text-sm font-semibold text-white">
                ${Number(payment.amount).toFixed(2)}
              </span>
            </div>

            <div className="text-xs text-zinc-600 font-mono truncate">
              {payment.paymentIntentId}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — table */}
      <div className="hidden sm:block rounded-xl border border-zinc-800/60 overflow-hidden">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Purchase History">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60"
                >
                  Title
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Price
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Status
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                 Payment ID

                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Date
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {payments.map((payment) => (
                  <Table.Row
                    key={payment._id}
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors"
                  >
                    <Table.Cell className="px-4 py-3">
                      <span className="text-sm font-medium text-white truncate max-w-[220px] block">
                        {payment.ebookTitle || "Untitled"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span className="text-sm font-semibold text-white">
                        ${Number(payment.amount).toFixed(2)}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                          STATUS_STYLES[payment.status] ||
                          "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span className="text-xs text-zinc-500 font-mono truncate max-w-[160px] block">
                        {payment.paymentIntentId}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span className="text-xs text-zinc-500">
                        {payment.createdAt
                          ? new Date(payment.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            )
                          : "—"}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </>
  );
};

export default PurchaseList;