// @/components/legal/Terms.tsx

"use client";
import React from "react";
import { translations } from "@/translations";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TracingBeam } from "../ui/aceternity/tracing-beam";
import { useLanguage } from "@/components/context/LanguageContext";

export function TermsOfService() {
  const { language } = useLanguage();
  const t = translations[language].legal.terms;

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 p-4">
        <Header />
        <Card className="p-6">
          <CardContent>
            <TracingBeam className="px-6">

              <div className="max-w-4xl mx-auto mt-12 p-4">
                <h1 className="font-bold text-2xl text-foreground mb-4">
                  {t.termsAndCondition}
                </h1>
                <p className="text-foreground/70 mb-2">{t.effectiveDate}</p>
                <p className="text-foreground/70 mb-8">{t.welcome}</p>

                {/* Definitions */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.definitions.title}
                  </h2>
                  <ul className="space-y-4">
                    <li className="text-foreground/70">{t.definitions.client}</li>
                    <li className="text-foreground/70">
                      {t.definitions.confidentialInfo}
                    </li>
                    <li className="text-foreground/70">
                      {t.definitions.services}
                    </li>
                    <li className="text-foreground/70">
                      {t.definitions.forceMajeure}
                    </li>
                  </ul>
                </section>

                {/* Scope */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.scope.title}
                  </h2>
                  <p className="text-foreground/70">{t.scope.content}</p>
                </section>

                {/* User Obligations */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.userObligations.title}
                  </h2>
                  <p className="text-foreground">{t.userObligations.intro}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.userObligations.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Intellectual Property */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.intellectualProperty.title}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-foreground/70">
                      {t.intellectualProperty.ownership}
                    </p>
                    <p className="text-foreground/70">
                      {t.intellectualProperty.licensing}
                    </p>
                    <p className="text-foreground/70">
                      {t.intellectualProperty.restrictions}
                    </p>
                    <p className="text-foreground/70">
                      {t.intellectualProperty.violation}
                    </p>
                  </div>
                </section>

                {/* Payment Terms */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.paymentTerms.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.paymentTerms.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.limitationOfLiability.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.limitationOfLiability.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Warranties */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.warranties.title}
                  </h2>
                  <p className="text-foreground">{t.warranties.intro}</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    {t.warranties.warrants.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-medium text-lg mb-2 text-foreground">
                    {t.warranties.exclusions.title}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.warranties.exclusions.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Termination */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.termination.title}
                  </h2>
                  <p className="text-foreground">{t.termination.forCause}</p>
                  <p className="text-foreground">
                    {t.termination.forConvenience}
                  </p>
                  <div className="mb-4">
                    <p className="text-foreground/70 mb-2">
                      {t.termination.uponTermination.intro}
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      {t.termination.uponTermination.list.map((item, index) => (
                        <li key={index} className="text-foreground/70">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-foreground/70">{t.termination.fees}</p>
                </section>

                {/* Compliance with Laws */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.complianceWithLaws.title}
                  </h2>
                  <p className="text-foreground">
                    {t.complianceWithLaws.adherence.intro}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    {t.complianceWithLaws.adherence.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-foreground/70">
                    {t.complianceWithLaws.clientCompliance}
                  </p>
                </section>

                {/* Data Protection */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.dataProtection.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.dataProtection.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Dispute Resolution */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.disputeResolution.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.disputeResolution.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Governing Law */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.governingLaw.title}
                  </h2>
                  <p className="text-foreground/70">{t.governingLaw.content}</p>
                </section>

                {/* Modifications */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">
                    {t.modifications.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.modifications.list.map((item, index) => (
                      <li key={index} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Contact Section */}
                <section className="mb-8">
                  <h2 className="font-semibold text-xl mb-4 text-foreground">{t.contact.title}</h2>
                  <p className="text-foreground/70 mb-2">{t.contact.content}</p>
                  <div className="space-y-2">
                    <p className="text-foreground/70">
                      <a href="mailto:contact@jirehgrp.com" className="hover:underline">
                        {t.contact.email}
                      </a>
                    </p>
                    <p className="text-foreground/70">
                      <a href="tel:+251935609339" className="hover:underline">
                        {t.contact.phone}
                      </a>
                    </p>
                    <p className="text-foreground/70">{t.contact.address}</p>
                  </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-border">
                  <p className="text-foreground/70 text-center">{t.footer}</p>
                  <p className="text-foreground/50 text-center mt-2">
                    Version: {t.version}
                  </p>
                </footer>
              </div>
            </TracingBeam>

          </CardContent>
        </Card>
        <Footer />
      </div>
    </>
  );
}
