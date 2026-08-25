import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { WorkProcess } from '@/components/sections/WorkProcess'
import JsonLd from '@/components/seo/JsonLd'
import { generateServiceSchema, generateFAQSchema } from '@/lib/schemaGenerators'
import { SERVICES_DATA } from '@/data/services'
import styles from './service-detail.module.css'

interface PageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug)
  if (!service) return {}

  return {
    title: `${service.heroH1} | 11:11 Decor`,
    description: service.intro,
    openGraph: {
      title: `${service.heroH1} | 11:11 Decor`,
      description: service.intro,
      images: [{ url: service.image }],
    },
  }
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.intro,
    slug: service.slug,
    image: service.image,
  })

  const faqSchema = generateFAQSchema(service.faqs)

  return (
    <main className={styles.detailContainer}>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className={styles.label}>OUR SERVICES</span>
          <div style={{ width: '100%', textAlign: 'center', margin: '0 auto 24px' }}>
            <WindRevealHeading as="h1" className={styles.heroHeading}>
              {service.heroH1}
            </WindRevealHeading>
          </div>
          <p className={styles.heroIntro}>{service.intro}</p>
        </div>
      </section>

      {/* Hero Banner Image */}
      <section className={styles.bannerSection}>
        <div className="container">
          <div className={styles.bannerWrapper}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="100vw"
              className={styles.bannerImage}
            />
          </div>
        </div>
      </section>

      {/* What We Provide & Why Choose Us */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left Column: What We Provide */}
            <div className={styles.provideBox} data-testid="what-we-provide">
              <h2 className={styles.sectionHeading}>What We Provide</h2>
              <ul className={styles.provideList}>
                {service.whatWeProvide.map((item, idx) => (
                  <li key={idx} className={styles.provideItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Why Choose & What To Expect */}
            <div className={styles.infoBox} data-testid="what-you-can-expect">
              <div className={styles.infoBlock}>
                <h3 className={styles.subHeading}>Why Choose 11:11 Decor</h3>
                <p className={styles.infoText}>{service.whyChooseUs}</p>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.subHeading}>What You Can Expect</h3>
                <p className={styles.infoText}>{service.whatYouCanExpect}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reused 4-Step Process Block */}
      <WorkProcess />

      {/* Related Services */}
      <section className={styles.relatedSection}>
        <div className="container">
          <h3 className={styles.relatedHeading}>Related Services</h3>
          <div className={styles.relatedGrid}>
            {service.relatedServices.map((rel) => (
              <Link key={rel.slug} href={`/services/${rel.slug}/`} className={styles.relatedChip}>
                <span>{rel.title}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection} data-testid="service-faqs">
        <div className="container">
          <div className={styles.faqHeader}>
            <span className={styles.label}>SERVICE FAQs</span>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {service.faqs.map((faq, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <span className={styles.faqPlus}>+</span>
                </summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to plan your {service.title}?</h2>
            <p className={styles.ctaText}>
              Reach out today to discuss your vision, check date availability, and receive a customized quote.
            </p>
            <Link href="/contact/" className={styles.ctaButton} data-testid="service-cta">
              {service.ctaText} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
