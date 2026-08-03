// @/components/proforma/ProformaDocument.tsx

"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { computeTotals, formatMoney, type ProformaData } from "@/lib/proforma";
import { formatGregorian, formatEthiopian } from "@/lib/ethiopian-date";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: "/fonts/Montserrat-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Montserrat-Bold.ttf", fontWeight: 700 },
  ],
});

const LIME = "#B7FF39";
const INK = "#1A1A1A";
const BODY = "#4A4A4A";
const MUTED = "#8B8A89";
const RULE = "#DDDDDD";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: BODY,
    paddingHorizontal: 52,
    paddingTop: 48,
    paddingBottom: 56,
  },

  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  wordmark: { fontSize: 20, fontWeight: 800, color: INK, letterSpacing: 1 },
  metaBlock: { alignItems: "flex-end" },
  metaRow: { flexDirection: "row", marginBottom: 3 },
  metaLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: INK,
    letterSpacing: 1,
    marginRight: 10,
  },
  metaValue: { fontSize: 9, fontWeight: 700, color: INK },
  metaValueLight: { fontSize: 9, fontWeight: 400, color: BODY },

  bigTitle: {
    fontSize: 46,
    fontWeight: 800,
    color: LIME,
    letterSpacing: -1,
    lineHeight: 1,
    marginTop: 18,
  },

  sectionLabel: {
    fontSize: 8.5,
    fontWeight: 700,
    color: INK,
    letterSpacing: 1,
    marginBottom: 5,
  },
  partyRow: { flexDirection: "row", justifyContent: "space-between" },
  partyCol: { width: "48%" },
  partyLine: { fontSize: 9.5, color: BODY, marginBottom: 2 },

  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: INK,
    paddingBottom: 7,
    marginBottom: 10,
  },
  th: { fontSize: 8.5, fontWeight: 700, color: INK, letterSpacing: 1 },
  colDesc: { width: "52%" },
  colUnit: { width: "18%", textAlign: "right" },
  colQty: { width: "10%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },

  itemRow: { flexDirection: "row", marginBottom: 10 },
  itemTitle: { fontSize: 10, fontWeight: 700, color: INK, marginBottom: 4 },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingRight: 12 },
  bulletDot: { width: 9, fontSize: 9, color: INK },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.45, color: BODY },
  cellValue: { fontSize: 9.5, color: BODY },

  totalsWrap: {
    borderTopWidth: 1,
    borderTopColor: INK,
    paddingTop: 10,
    marginTop: 6,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  totalsLabel: { width: 120, textAlign: "right", fontSize: 9.5, color: BODY },
  totalsLabelStrong: {
    width: 120,
    textAlign: "right",
    fontSize: 10,
    fontWeight: 700,
    color: INK,
    letterSpacing: 1,
  },
  totalsValue: {
    width: 120,
    textAlign: "right",
    fontSize: 9.5,
    color: BODY,
  },
  totalsValueStrong: {
    width: 120,
    textAlign: "right",
    fontSize: 11,
    fontWeight: 700,
    color: INK,
  },

  block: { marginTop: 22 },
  blockHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: RULE,
    paddingTop: 12,
    marginBottom: 9,
  },
  smallCaps: {
    fontSize: 8.5,
    fontWeight: 700,
    color: INK,
    letterSpacing: 1,
  },
  smallMuted: { fontSize: 8.5, color: MUTED, letterSpacing: 1 },
  bankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  bankName: { fontSize: 9.5, fontWeight: 700, color: INK, width: "40%" },
  bankMeta: { fontSize: 9.5, color: BODY, width: "58%", textAlign: "right" },

  noteText: { fontSize: 8.5, color: MUTED, lineHeight: 1.6, marginTop: 4 },

  footer: {
    position: "absolute",
    bottom: 28,
    left: 52,
    right: 52,
    borderTopWidth: 1,
    borderTopColor: RULE,
    paddingTop: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 7.5, color: MUTED, letterSpacing: 1 },
});

function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function ProformaDocument({ data }: { data: ProformaData }) {
  const totals = computeTotals(data);
  const issue = parseDate(data.issueDate);
  const due = parseDate(data.dueDate);
  const valid = parseDate(data.validUntil);

  return (
    <Document
      title={`Proforma ${data.invoiceNumber} — ${data.clientName}`}
      author={data.companyName}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.wordmark}>JIREHGRP</Text>

          <View style={styles.metaBlock}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>INVOICE NO:</Text>
              <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>DATE:</Text>
              <Text style={styles.metaValueLight}>
                {formatGregorian(issue)} G.C
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaValueLight}>
                {formatEthiopian(issue)} E.C
              </Text>
            </View>
            <View style={[styles.metaRow, { marginTop: 6 }]}>
              <Text style={styles.metaLabel}>DUE:</Text>
              <Text style={styles.metaValueLight}>
                {formatGregorian(due)} G.C
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>VALID UNTIL:</Text>
              <Text style={styles.metaValueLight}>
                {formatGregorian(valid)} G.C
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.bigTitle}>PROFORMA</Text>
        <Text style={[styles.bigTitle, { marginTop: 0 }]}>INVOICE</Text>

        <View style={[styles.partyRow, { marginTop: 34 }]}>
          <View style={styles.partyCol}>
            <Text style={styles.sectionLabel}>ISSUED TO:</Text>
            <Text style={styles.partyLine}>{data.clientName}</Text>
            {!!data.clientCompany && (
              <Text style={styles.partyLine}>{data.clientCompany}</Text>
            )}
            {!!data.clientAddress && (
              <Text style={styles.partyLine}>{data.clientAddress}</Text>
            )}
            {!!data.clientTin && (
              <Text style={styles.partyLine}>TIN: {data.clientTin}</Text>
            )}
            {!!data.clientPhone && (
              <Text style={styles.partyLine}>{data.clientPhone}</Text>
            )}
            {!!data.clientEmail && (
              <Text style={styles.partyLine}>{data.clientEmail}</Text>
            )}
          </View>

          <View style={styles.partyCol}>
            <Text style={styles.sectionLabel}>PAY TO:</Text>
            <Text style={styles.partyLine}>{data.companyName}</Text>
            <Text style={styles.partyLine}>{data.companyAddress}</Text>
            {!!data.companyTin && (
              <Text style={styles.partyLine}>TIN: {data.companyTin}</Text>
            )}
            <Text style={styles.partyLine}>
              {data.preparedBy} ({data.preparedByRole})
            </Text>
            <Text style={styles.partyLine}>{data.companyPhone}</Text>
            <Text style={styles.partyLine}>{data.companyEmail}</Text>
          </View>
        </View>

        <View style={[styles.tableHead, { marginTop: 30 }]}>
          <Text style={[styles.th, styles.colDesc]}>DESCRIPTION</Text>
          <Text style={[styles.th, styles.colUnit]}>UNIT PRICE</Text>
          <Text style={[styles.th, styles.colQty]}>QTY</Text>
          <Text style={[styles.th, styles.colTotal]}>TOTAL</Text>
        </View>

        {data.items.map((item) => (
          <View key={item.id} style={styles.itemRow} wrap={false}>
            <View style={styles.colDesc}>
              {!!item.title && (
                <Text style={styles.itemTitle}>{item.title}</Text>
              )}
              {item.bullets
                .filter((b) => b.trim() !== "")
                .map((bullet, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
            </View>
            <Text style={[styles.cellValue, styles.colUnit]}>
              {formatMoney(item.unitPrice)}
            </Text>
            <Text style={[styles.cellValue, styles.colQty]}>
              {item.quantity}
            </Text>
            <Text style={[styles.cellValue, styles.colTotal]}>
              {formatMoney(item.unitPrice * item.quantity)} {data.currency}
            </Text>
          </View>
        ))}

        <View style={styles.totalsWrap}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabelStrong}>SUBTOTAL</Text>
            <Text style={styles.totalsValueStrong}>
              {formatMoney(totals.subtotal)} {data.currency}
            </Text>
          </View>

          {data.vatMode !== "none" && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>
                VAT {data.vatRate}%
                {data.vatMode === "inclusive" ? " (incl.)" : ""}
              </Text>
              <Text style={styles.totalsValue}>
                {formatMoney(totals.vat)} {data.currency}
              </Text>
            </View>
          )}

          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabelStrong}>TOTAL</Text>
            <Text style={styles.totalsValueStrong}>
              {formatMoney(totals.total)} {data.currency}
            </Text>
          </View>
        </View>

        {data.paymentOptions.length > 0 && (
          <View style={styles.block}>
            <View style={styles.blockHead}>
              <Text style={styles.smallCaps}>PAYMENT OPTIONS</Text>
              <Text style={styles.smallMuted}>
                {data.paymentOptions.length} PAYMENT OPTION
                {data.paymentOptions.length > 1 ? "S" : ""}
              </Text>
            </View>

            {data.paymentOptions.map((option) => (
              <View key={option.id} style={styles.bankRow}>
                <Text style={styles.bankName}>{option.label}</Text>
                <Text style={styles.bankMeta}>
                  {formatMoney(option.amount)} {data.currency}
                  {option.dueNote ? ` — ${option.dueNote}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.banks.some((bank) => bank.accountNumber.trim() !== "") && (
          <View style={styles.block}>
            <View style={styles.blockHead}>
              <Text style={styles.smallCaps}>BANK DETAILS</Text>
            </View>

            {data.banks
              .filter((bank) => bank.accountNumber.trim() !== "")
              .map((bank) => (
                <View key={bank.id} style={styles.bankRow}>
                  <Text style={styles.bankName}>{bank.bankName}</Text>
                  <Text style={styles.bankMeta}>
                    {bank.accountName} — {bank.accountNumber}
                  </Text>
                </View>
              ))}
          </View>
        )}

        {(!!data.notes || !!data.terms) && (
          <View style={styles.block}>
            <View style={styles.blockHead}>
              <Text style={styles.smallCaps}>NOTES &amp; TERMS</Text>
            </View>
            {!!data.notes && <Text style={styles.noteText}>{data.notes}</Text>}
            {!!data.terms && <Text style={styles.noteText}>{data.terms}</Text>}
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {data.companyName.toUpperCase()} · PROFORMA {data.invoiceNumber}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `PAGE ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
