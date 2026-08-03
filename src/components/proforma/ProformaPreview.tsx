// @/components/proforma/ProformaPreview.tsx

"use client";
import {
  computeTotals,
  formatMoney,
  type ProformaData,
} from "@/lib/proforma";
import { formatGregorian, formatEthiopian } from "@/lib/ethiopian-date";
import styles from "./proforma.module.css";

function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function ProformaPreview({ data }: { data: ProformaData }) {
  const totals = computeTotals(data);
  const issue = parseDate(data.issueDate);

  const visibleItems = data.items.filter(
    (item) => item.title.trim() !== "" || item.unitPrice > 0,
  );

  return (
    <div className={styles.paper}>
      <div className={styles.paperHead}>
        <span className={styles.paperMark}>JIREHGRP</span>
        <div className={styles.paperMeta}>
          <span>
            <em>NO</em> {data.invoiceNumber}
          </span>
          <span>{formatGregorian(issue)} G.C</span>
          <span className={styles.paperMetaFaint}>
            {formatEthiopian(issue)} E.C
          </span>
        </div>
      </div>

      <p className={styles.paperTitle}>
        PROFORMA
        <br />
        INVOICE
      </p>

      <div className={styles.paperParties}>
        <div>
          <em>ISSUED TO</em>
          <span>{data.clientName || "—"}</span>
          {!!data.clientCompany && <span>{data.clientCompany}</span>}
        </div>
        <div>
          <em>PAY TO</em>
          <span>{data.companyName}</span>
          <span>
            {data.preparedBy} ({data.preparedByRole})
          </span>
        </div>
      </div>

      <div className={styles.paperTableHead}>
        <span>DESCRIPTION</span>
        <span>TOTAL</span>
      </div>

      {visibleItems.length === 0 ? (
        <p className={styles.paperEmpty}>
          Add a line item to see it here.
        </p>
      ) : (
        visibleItems.map((item) => (
          <div key={item.id} className={styles.paperItem}>
            <div>
              <strong>{item.title || "Untitled item"}</strong>
              {item.bullets.filter((b) => b.trim()).length > 0 && (
                <em>
                  {item.bullets.filter((b) => b.trim()).length} detail
                  {item.bullets.filter((b) => b.trim()).length > 1 ? "s" : ""}
                </em>
              )}
            </div>
            <span>{formatMoney(item.unitPrice * item.quantity)}</span>
          </div>
        ))
      )}

      <div className={styles.paperTotals}>
        <div>
          <span>Subtotal</span>
          <span>{formatMoney(totals.subtotal)}</span>
        </div>
        {data.vatMode !== "none" && (
          <div>
            <span>
              VAT {data.vatRate}%
              {data.vatMode === "inclusive" ? " incl." : ""}
            </span>
            <span>{formatMoney(totals.vat)}</span>
          </div>
        )}
        <div className={styles.paperGrand}>
          <span>Total</span>
          <span>
            {formatMoney(totals.total)} {data.currency}
          </span>
        </div>
      </div>
    </div>
  );
}