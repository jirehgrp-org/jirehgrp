// @/components/legal/Privacy.tsx

"use client";
import React from "react";
import { translations } from "@/translations";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TracingBeam } from "../ui/aceternity/tracing-beam";
import { useLanguage } from "@/components/context/LanguageContext";

export function PrivacyPolicy() {
  const { language } = useLanguage();
  const t = translations[language].legal.privacy;

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 p-4">
      <Header />
        <Card className="p-6">
          <CardContent>
            <TracingBeam className="px-6">
            <div className="max-w-4xl mx-auto mt-12 p-4">
              <h1 className="font-bold text-2xl text-foreground mb-4">
                {t.privacyPolicy}
              </h1>
              <p className="text-foreground/70 mb-2">{t.effectiveDate}</p>
              <p className="text-foreground/70 mb-8">{t.lastUpdated}</p>
              <p className="text-foreground/70 mb-8">{t.intro}</p>

              {/* Section 1: Information We Collect */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.informationCollected.title}</h2>
                <h3 className="font-medium text-lg mb-2 text-foreground">{t.informationCollected.personal.title}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {t.informationCollected.personal.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
                <h3 className="font-medium text-lg mb-2 text-foreground">{t.informationCollected.technical.title}</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {t.informationCollected.technical.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
                <h3 className="font-medium text-lg mb-2 text-foreground">{t.informationCollected.transactional.title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {t.informationCollected.transactional.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 2: Use of Information */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.useOfInformation.title}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t.useOfInformation.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 3: Data Sharing */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.dataSharing.title}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t.dataSharing.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 4: Security */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.storageSecurity.title}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t.storageSecurity.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 5: Transfers */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.dataTransfers.title}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t.dataTransfers.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Section 6: Rights */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.userRights.title}</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {t.userRights.list.map((item, index) => (
                    <li key={index} className="text-foreground/70">{item}</li>
                  ))}
                </ul>
                <p className="text-foreground/70">{t.userRights.contactNote}</p>
              </section>

              {/* Section 7: Cookies */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.cookies.title}</h2>
                <p className="text-foreground/70">{t.cookies.content}</p>
              </section>

              {/* Section 8: Retention */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.dataRetention.title}</h2>
                <p className="text-foreground/70">{t.dataRetention.content}</p>
              </section>

              {/* Section 9: Minors */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.minors.title}</h2>
                <p className="text-foreground/70">{t.minors.content}</p>
              </section>

              {/* Section 10: Changes */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.changes.title}</h2>
                <p className="text-foreground/70">{t.changes.content}</p>
              </section>

              {/* Section 11: Contact */}
              <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4 text-foreground">{t.contact.title}</h2>
                <p className="text-foreground/70 mb-2">{t.contact.content}</p>
                <div className="space-y-2">
                  <p className="text-foreground/70">{t.contact.email}</p>
                  <p className="text-foreground/70">{t.contact.phone}</p>
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
