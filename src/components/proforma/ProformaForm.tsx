/* eslint-disable react-hooks/set-state-in-effect */
// @/components/proforma/ProformaForm.tsx

"use client";
import { useEffect, useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import {
  clearDraft,
  loadDraft,
  loadHistory,
  pushHistory,
  removeHistory,
  saveDraft,
  type HistoryEntry,
} from "@/lib/proforma-storage";
import {
  commitInvoiceNumber,
  computeTotals,
  createEmptyProforma,
  formatMoney,
  paymentsBalance,
  DUE_NOTE_PRESETS,
  PAYMENT_PRESETS,
  type BankAccount,
  type LineItem,
  type PaymentOption,
  type ProformaData,
  nextInvoiceNumber,
} from "@/lib/proforma";
import { ProformaDocument } from "./ProformaDocument";
import { ProformaPreview } from "./ProformaPreview";
import styles from "./proforma.module.css";

export function ProformaForm() {
  const [data, setData] = useState<ProformaData>(createEmptyProforma);
  const [isGenerating, setIsGenerating] = useState(false);
  const [restored, setRestored] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  // Bring back an unfinished proforma after a reload.
  useEffect(() => {
    const draft = loadDraft();

    if (draft) {
      setData(draft);
      setRestored(true);
    }

    setHistory(loadHistory());
  }, []);

  // Debounced autosave so we're not hitting storage on every keystroke.
  useEffect(() => {
    setIsDirty(true);

    const timer = window.setTimeout(() => {
      saveDraft(data);
      setSavedAt(new Date());
      setIsDirty(false);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [data]);

  // Catch a tab close that lands between saves.
  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Keep a second tab from overwriting what this one is doing.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === "jirehgrp:proforma-history") {
        setHistory(loadHistory());
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const totals = useMemo(() => computeTotals(data), [data]);
  const balance = useMemo(
    () => paymentsBalance(data.paymentOptions, totals.total),
    [data.paymentOptions, totals.total],
  );

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 9);

    return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 9)]
      .filter(Boolean)
      .join(" ");
  }

  function update<K extends keyof ProformaData>(
    key: K,
    value: ProformaData[K],
  ) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setData((previous) => ({
      ...previous,
      items: previous.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addItem() {
    setData((previous) => ({
      ...previous,
      items: [
        ...previous.items,
        {
          id: crypto.randomUUID(),
          title: "",
          bullets: [""],
          unitPrice: 0,
          quantity: 1,
        },
      ],
    }));
  }

  function removeItem(id: string) {
    setData((previous) => ({
      ...previous,
      items: previous.items.filter((item) => item.id !== id),
    }));
  }

  function updateBank(id: string, patch: Partial<BankAccount>) {
    setData((previous) => ({
      ...previous,
      banks: previous.banks.map((bank) =>
        bank.id === id ? { ...bank, ...patch } : bank,
      ),
    }));
  }

  function addBank() {
    setData((previous) => ({
      ...previous,
      banks: [
        ...previous.banks,
        {
          id: crypto.randomUUID(),
          bankName: "",
          accountName: previous.companyName,
          accountNumber: "",
        },
      ],
    }));
  }

  function removeBank(id: string) {
    setData((previous) => ({
      ...previous,
      banks: previous.banks.filter((bank) => bank.id !== id),
    }));
  }

  function updateOption(id: string, patch: Partial<PaymentOption>) {
    setData((previous) => ({
      ...previous,
      paymentOptions: previous.paymentOptions.map((option) =>
        option.id === id ? { ...option, ...patch } : option,
      ),
    }));
  }

  /** Presets with a share auto-fill their amount from the current total. */
  function applyPreset(id: string, presetValue: string) {
    const preset = PAYMENT_PRESETS.find((p) => p.value === presetValue);
    if (!preset) return;

    updateOption(id, {
      preset: preset.value,
      label: preset.label,
      ...(preset.share > 0
        ? { amount: Number(((totals.total * preset.share) / 100).toFixed(2)) }
        : {}),
    });
  }

  function addOption() {
    const isFirst = data.paymentOptions.length === 0;

    setData((previous) => ({
      ...previous,
      paymentOptions: [
        ...previous.paymentOptions,
        {
          id: crypto.randomUUID(),
          preset: isFirst ? "full" : "custom",
          label: isFirst ? "Full payment" : "Custom",
          amount: isFirst ? totals.total : 0,
          dueNote: "",
        },
      ],
    }));
  }

  function removeOption(id: string) {
    setData((previous) => ({
      ...previous,
      paymentOptions: previous.paymentOptions.filter(
        (option) => option.id !== id,
      ),
    }));
  }

  function startFresh() {
    const hasContent = data.clientName.trim() !== "" || totals.total > 0;

    if (
      hasContent &&
      !window.confirm("Discard this proforma and start a new one?")
    ) {
      return;
    }

    clearDraft();
    setData(createEmptyProforma());
    setRestored(false);
    setSavedAt(null);
  }

  function reopen(entry: HistoryEntry) {
    const hasContent = data.clientName.trim() !== "" || totals.total > 0;

    if (
      hasContent &&
      !window.confirm(
        `Replace what's on screen with proforma ${entry.invoiceNumber}?`,
      )
    ) {
      return;
    }

    setData(entry.data);
    setRestored(false);
  }

  function forget(invoiceNumber: string) {
    setHistory(removeHistory(invoiceNumber));
  }

  function duplicateFor(entry: HistoryEntry) {
    setData({
      ...entry.data,
      invoiceNumber: nextInvoiceNumber(),
      issueDate: new Date().toISOString().slice(0, 10),
    });
    setRestored(false);
  }

  async function handleGenerate() {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await pdf(<ProformaDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);

      const safeClient = (data.clientName || "client")
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "");

      const link = document.createElement("a");
      link.href = url;
      link.download = `Proforma-${data.invoiceNumber}-${safeClient}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      commitInvoiceNumber(data.invoiceNumber);

      setHistory(
        pushHistory({
          invoiceNumber: data.invoiceNumber,
          clientName: data.clientName,
          total: totals.total,
          currency: data.currency,
          savedAt: new Date().toISOString(),
          data,
        }),
      );
    } catch (error) {
      console.error("Proforma generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  const canGenerate =
    data.clientName.trim() !== "" && totals.total > 0 && !isGenerating;

  return (
    <div className={styles.shell}>
      <header className={styles.masthead}>
        <h1 className={styles.mastheadTitle}>Proforma generator</h1>
        <span className={styles.mastheadNote}>
          {isDirty
            ? "Saving…"
            : savedAt
              ? `Saved ${savedAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : restored
                ? "Draft restored"
                : "Saves as you type"}
          {" · "}
          <button
            type="button"
            onClick={startFresh}
            className={styles.linkButton}
          >
            Start fresh
          </button>
        </span>
      </header>

      <div className={styles.layout}>
        <div>
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Invoice</h2>
            </div>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>Invoice number</span>
                <input
                  value={data.invoiceNumber}
                  onChange={(e) => update("invoiceNumber", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Issue date</span>
                <input
                  type="date"
                  value={data.issueDate}
                  onChange={(e) => update("issueDate", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Payment due</span>
                <input
                  type="date"
                  value={data.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Quote valid until</span>
                <input
                  type="date"
                  value={data.validUntil}
                  onChange={(e) => update("validUntil", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Issued to</h2>
            </div>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>Client name</span>
                <input
                  value={data.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                  placeholder="Name"
                />
              </label>
              <label className={styles.field}>
                <span>Company</span>
                <input
                  value={data.clientCompany}
                  onChange={(e) => update("clientCompany", e.target.value)}
                  placeholder="Jirehgrp"
                />
              </label>
              <label className={styles.field}>
                <span>TIN</span>
                <input
                  value={data.clientTin}
                  onChange={(e) => update("clientTin", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Address</span>
                <input
                  value={data.clientAddress}
                  onChange={(e) => update("clientAddress", e.target.value)}
                  placeholder="Addis Ababa"
                />
              </label>
              <label className={`${styles.field} ${styles.phoneField}`}>
                <span>Phone</span>

                <div className={styles.phoneControl}>
                  <span className={styles.phonePrefix}>+251</span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhone(data.clientPhone)}
                    onChange={(e) => {
                      const phone = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      update("clientPhone", phone);
                    }}
                    placeholder="91 234 5678"
                  />
                </div>
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input
                  value={data.clientEmail}
                  onChange={(e) => update("clientEmail", e.target.value)}
                  placeholder="abebekebede@xxx.com"
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Pay to</h2>
            </div>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>Company name</span>
                <input
                  value={data.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Address</span>
                <input
                  value={data.companyAddress}
                  onChange={(e) => update("companyAddress", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>TIN</span>
                <input
                  value={data.companyTin}
                  onChange={(e) => update("companyTin", e.target.value)}
                  placeholder="Required for VAT invoices"
                />
              </label>
              <label className={styles.field}>
                <span>Prepared by</span>
                <input
                  value={data.preparedBy}
                  onChange={(e) => update("preparedBy", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Role</span>
                <input
                  value={data.preparedByRole}
                  onChange={(e) => update("preparedByRole", e.target.value)}
                />
              </label>
              <label className={`${styles.field} ${styles.phoneField}`}>
                <span>Phone</span>

                <div className={styles.phoneControl}>
                  <span className={styles.phonePrefix}>+251</span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhone(data.companyPhone)}
                    onChange={(e) => {
                      const phone = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      update("companyPhone", phone);
                    }}
                    placeholder="91 234 5678"
                  />
                </div>
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input
                  value={data.companyEmail}
                  onChange={(e) => update("companyEmail", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Line items</h2>
              <button
                type="button"
                onClick={addItem}
                className={styles.ghostButton}
              >
                Add item
              </button>
            </div>

            {data.items.map((item, index) => (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.itemCardHead}>
                  <span className={styles.itemIndex}>Item {index + 1}</span>
                  <span className={styles.itemLineTotal}>
                    {formatMoney(item.unitPrice * item.quantity)}{" "}
                    {data.currency}
                    {data.items.length > 1 && (
                      <>
                        {"  "}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className={styles.linkButton}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </span>
                </div>

                <label className={styles.field}>
                  <span>Title</span>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateItem(item.id, { title: e.target.value })
                    }
                    placeholder="Custom promotional website design"
                  />
                </label>

                <label className={styles.field}>
                  <span>What it includes — one per line</span>
                  <textarea
                    rows={5}
                    value={item.bullets.join("\n")}
                    onChange={(e) =>
                      updateItem(item.id, {
                        bullets: e.target.value.split("\n"),
                      })
                    }
                    placeholder={
                      "Responsive across mobile, tablet, and desktop\nConversion-focused layout with clear calls to action\n2 rounds of revisions and 30 days of post-launch support"
                    }
                  />
                </label>

                <div className={styles.grid}>
                  <label className={`${styles.field} ${styles.money}`}>
                    <span>Unit price</span>
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice || ""}
                      onChange={(e) =>
                        updateItem(item.id, {
                          unitPrice: Number(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                    />
                  </label>
                  <label className={`${styles.field} ${styles.money}`}>
                    <span>Quantity</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, {
                          quantity: Number(e.target.value) || 1,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Tax</h2>
            </div>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>VAT handling</span>
                <select
                  value={data.vatMode}
                  onChange={(e) =>
                    update("vatMode", e.target.value as ProformaData["vatMode"])
                  }
                >
                  <option value="inclusive">Prices already include VAT</option>
                  <option value="exclusive">Add VAT on top</option>
                  <option value="none">No VAT</option>
                </select>
              </label>
              <label className={`${styles.field} ${styles.money}`}>
                <span>VAT rate %</span>
                <input
                  type="number"
                  value={data.vatRate}
                  onChange={(e) =>
                    update("vatRate", Number(e.target.value) || 0)
                  }
                />
              </label>
              <label className={styles.field}>
                <span>Currency</span>
                <input
                  value={data.currency}
                  onChange={(e) => update("currency", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Payment options</h2>
              <button
                type="button"
                onClick={addOption}
                className={styles.ghostButton}
              >
                Add option
              </button>
            </div>

            {data.paymentOptions.length > 0 && (
              <p
                className={`${styles.balanceHint} ${
                  balance.balanced ? styles.balanceOk : ""
                }`}
              >
                {balance.balanced
                  ? `Options add up to the ${formatMoney(totals.total)} ${data.currency} total.`
                  : `${formatMoney(Math.abs(balance.remaining))} ${data.currency} ${
                      balance.remaining > 0
                        ? "still unallocated"
                        : "over the total"
                    }.`}
              </p>
            )}

            {data.paymentOptions.map((option) => (
              <div key={option.id} className={styles.rowCard}>
                <div className={styles.rowCardHead}>
                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    className={styles.linkButton}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>Type</span>
                    <select
                      value={option.preset}
                      onChange={(e) => applyPreset(option.id, e.target.value)}
                    >
                      {PAYMENT_PRESETS.map((preset) => (
                        <option key={preset.value} value={preset.value}>
                          {preset.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {option.preset === "custom" && (
                    <label className={styles.field}>
                      <span>Label on invoice</span>
                      <input
                        value={option.label}
                        onChange={(e) =>
                          updateOption(option.id, { label: e.target.value })
                        }
                      />
                    </label>
                  )}

                  <label className={`${styles.field} ${styles.money}`}>
                    <span>Amount</span>
                    <input
                      type="number"
                      step="0.01"
                      value={option.amount || ""}
                      onChange={(e) =>
                        updateOption(option.id, {
                          amount: Number(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Due</span>
                    <select
                      value={option.dueNote}
                      onChange={(e) =>
                        updateOption(option.id, { dueNote: e.target.value })
                      }
                    >
                      {DUE_NOTE_PRESETS.map((note) => (
                        <option key={note || "none"} value={note}>
                          {note || "No note"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Bank accounts</h2>
              <button
                type="button"
                onClick={addBank}
                className={styles.ghostButton}
              >
                Add account
              </button>
            </div>

            {data.banks.map((bank) => (
              <div key={bank.id} className={styles.rowCard}>
                {data.banks.length > 1 && (
                  <div className={styles.rowCardHead}>
                    <button
                      type="button"
                      onClick={() => removeBank(bank.id)}
                      className={styles.linkButton}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <div className={styles.grid}>
                  <label className={styles.field}>
                    <span>Bank</span>
                    <input
                      value={bank.bankName}
                      onChange={(e) =>
                        updateBank(bank.id, { bankName: e.target.value })
                      }
                      placeholder="Commercial Bank of Ethiopia"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Account name</span>
                    <input
                      value={bank.accountName}
                      onChange={(e) =>
                        updateBank(bank.id, { accountName: e.target.value })
                      }
                    />
                  </label>
                  <label className={`${styles.field} ${styles.money}`}>
                    <span>Account number</span>
                    <input
                      value={bank.accountNumber}
                      onChange={(e) =>
                        updateBank(bank.id, { accountNumber: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Notes and terms</h2>
            </div>
            <label className={styles.field}>
              <span>Notes</span>
              <textarea
                rows={3}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Anything the client should know before accepting."
              />
            </label>
            <label className={styles.field}>
              <span>Terms</span>
              <textarea
                rows={3}
                value={data.terms}
                onChange={(e) => update("terms", e.target.value)}
              />
            </label>
          </section>
        </div>

        <aside className={styles.previewCol}>
          <span className={styles.previewLabel}>Preview</span>

          <ProformaPreview data={data} />

          <div className={styles.generateCard}>
            <div className={styles.generateTotals}>
              <span>
                Subtotal {formatMoney(totals.subtotal)} {data.currency}
              </span>
              {data.vatMode !== "none" && (
                <span>
                  VAT {formatMoney(totals.vat)} {data.currency}
                </span>
              )}
              <strong>
                {formatMoney(totals.total)} {data.currency}
              </strong>
              {history.length > 0 && (
                <div className={styles.historyCard}>
                  <span className={styles.previewLabel}>Recent</span>

                  {history.slice(0, 6).map((entry) => (
                    <div
                      key={entry.invoiceNumber}
                      className={styles.historyRow}
                    >
                      <button
                        type="button"
                        onClick={() => reopen(entry)}
                        className={styles.historyOpen}
                      >
                        <strong>
                          {entry.invoiceNumber} ·{" "}
                          {entry.clientName || "No client"}
                        </strong>
                        <em>
                          {formatMoney(entry.total)} {entry.currency}
                          {" · "}
                          {new Date(entry.savedAt).toLocaleDateString()}
                        </em>
                      </button>

                      <span className={styles.historyActions}>
                        <button
                          type="button"
                          onClick={() => duplicateFor(entry)}
                          className={styles.linkButton}
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => forget(entry.invoiceNumber)}
                          className={styles.linkButton}
                        >
                          Forget
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={styles.primaryButton}
            >
              {isGenerating ? "Generating…" : "Generate PDF"}
            </button>

            <p className={styles.hintText}>
              {!data.clientName.trim()
                ? "Add a client name to generate."
                : totals.total <= 0
                  ? "Add a line item with a price to generate."
                  : `Saves as Proforma-${data.invoiceNumber}.pdf`}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
