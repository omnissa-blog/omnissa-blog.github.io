import Image from "next/image";
import Link from "next/link";
import OmnissaLogo from "./omnissa-logo";

const SOCIAL_ICON_SIZE = {
  width: 24,
  height: 24,
};

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/omnissa/",
    icon: "/assets/icons/linkedin.svg",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/WeAreOmnissa",
    icon: "/assets/icons/facebook.svg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@WeAreOmnissa",
    icon: "/assets/icons/youtube.svg",
  },
  {
    name: "X",
    url: "https://twitter.com/WeAreOmnissa",
    icon: "/assets/icons/x.svg",
  },
];

const FOOTER_SECTIONS = [
  {
    title: "Offerings",
    links: [
      { text: "Omnissa platform", href: "https://www.omnissa.com/platform/" },
      {
        text: "Platform services",
        href: "https://www.omnissa.com/products/#platform-services",
      },
      { text: "Products", href: "https://www.omnissa.com/products/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "https://www.omnissa.com/insights/#Blog" },
      { text: "Partners", href: "https://www.omnissa.com/partners/" },
      {
        text: "Security response",
        href: "https://www.omnissa.com/omnissa-security-response/",
      },
      { text: "Trust center", href: "https://www.omnissa.com/trust-center/" },
      { text: "User portal", href: "https://www.omnissa.com/user-portal/" },
      { text: "Glossary", href: "https://www.omnissa.com/glossary/" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "https://www.omnissa.com/about-us/" },
      { text: "News", href: "https://www.omnissa.com/insights/#News" },
      { text: "Careers", href: "https://www.omnissa.com/careers/" },
      { text: "Contact us", href: "https://www.omnissa.com/contact-us/" },
    ],
  },
];

const LEGAL_LINKS = [
  { text: "Trust center", href: "https://www.omnissa.com/trust-center/" },
  { text: "Legal center", href: "https://www.omnissa.com/legal-center/" },
  {
    text: "Privacy notice",
    href: "https://www.omnissa.com/trust-center/#privacy-notices",
  },
  {
    text: "Terms & conditions",
    href: "https://www.omnissa.com/omnissa-website-terms-use/",
  },
];

const COMPANY_INFO = {
  name: "© 2025 Omnissa, LLC",
  address: ["590 E Middlefield Road,", "Mountain View CA 94043"],
  rights: "All Rights Reserved.",
};

export default function Footer() {
  return (
    <footer className="footer-gradient-bar w-full text-foreground pb-0">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-8 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Left: Logo, Social, Address */}
        <div className="flex flex-col items-start md:items-start">
          <div className="flex flex-col items-start w-full">
            <OmnissaLogo width={220} height={44} className="text-white" />
            <div className="flex gap-4 mt-11 mb-9">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  className="rounded-full bg-primary w-11 h-11 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-lg"
                  target="_blank"
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={SOCIAL_ICON_SIZE.width}
                    height={SOCIAL_ICON_SIZE.height}
                    className="w-5 h-5"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="text-border leading-[22px] text-[18px] font-extralight">
            <div>{COMPANY_INFO.name}</div>
            {COMPANY_INFO.address.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            <div>{COMPANY_INFO.rights}</div>
          </div>
        </div>

        {/* Center: Navigation Sections */}
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="text-[22px] font-normal text-white mb-4">
              {section.title}
            </div>
            <ul className="space-y-2 text-base text-border font-light">
              {section.links.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="hover:underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-[#23294a] text-border text-center py-6 font-extralight border-t border-[#23294a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3">
          {LEGAL_LINKS.map((link, index) => (
            <div key={link.text} className="flex items-center">
              <Link
                href={link.href}
                className="hover:underline"
                target="_blank"
              >
                {link.text}
              </Link>
              {index < LEGAL_LINKS.length - 1 && (
                <span className="hidden md:inline ml-3">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
