"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaApple, FaGooglePlay } from "react-icons/fa";


type Project = {
  title: string
  subtitle: string
  description: string
  contributions: string[]
  tech: string[]
  exampleApp?: {
    android?: string
    ios?: string
  }
  allApps?: {
    android?: string
    ios?: string
  }
}

const projects: Project[] = [
  {
    title: "VXSTEP",
    subtitle: "School & Institution CRM & POS Mobile System",
    description:
      "VXSTEP is a CRM-based mobile system for schools that integrates student services, digital forms and a POS ecosystem for daily school operations.",

    contributions: [
      "Developed and integrated POS-related features that connect student purchases with the central CRM system",
      "Implemented smart card functionality where parents can top up balances through RinggitPay and students use the card for in-school transactions",
      "Integrated backend APIs and maintained data synchronization between POS, student accounts and administrative modules",
      "Implemented common application modules such as search and filtering for news, events and people, and backend-driven data listings"
    ],

    tech: ["Flutter", "Dart", "GetX", "REST API", "Firebase"],

    exampleApp: {
      android: "https://play.google.com/store/apps/details?id=com.vx0810smklk.vxstep&hl=en",
      ios: "https://apps.apple.com/my/app/selari/id6575362873"
    },

    allApps: {
      android:
        "https://play.google.com/store/apps/collection/cluster?gsr=SldqGHZqVXRsbE0veVU0UTRCTUQ1ZSszVXc9PbICNwoaChZjb20udngxMDAxc21rcm0udnhzdGVwEAcSFwgBEhM2MjM0Mzk2NTUxMTIyNzgzNjcxGACwEgA%3D:S:ANO1ljJwfrE&hl=en",
      ios:
        "https://apps.apple.com/my/developer/vx-ventures-sdn-bhd/id1599026700?l=en"
    }
  },

  {
    title: "VXSUARA",
    subtitle: "Community & Engagement Platform",
    description:
      "VXSUARA is a community and engagement mobile platform used by organizations to distribute information and collect user data.",

    contributions: [
      "Implemented backend-driven dynamic form modules with QR code access for data collection",
      "Integrated APIs for dynamic content and community modules",
      "Performed testing and prepared Android and iOS builds for release",
      "Implemented common application modules such as search and filtering for news, events and people, and backend-driven data listings"
    ],

    tech: ["Flutter", "Dart", "GetX", "REST API"],

    exampleApp: {
      android: "https://play.google.com/store/apps/details?id=com.vxsuara.vxtechnica.duyong&hl=en",
      ios: "https://apps.apple.com/my/app/duyong-kita/id6738380488"
    },

    allApps: {
      android:
        "https://play.google.com/store/apps/collection/cluster?gsr=SldqGHZqVXRsbE0veVU0UTRCTUQ1ZSszVXc9PbICNwoaChZjb20udngxMDAxc21rcm0udnhzdGVwEAcSFwgBEhM2MjM0Mzk2NTUxMTIyNzgzNjcxGACwEgA%3D:S:ANO1ljJwfrE&hl=en",
      ios:
        "https://apps.apple.com/my/developer/vx-ventures-sdn-bhd/id1599026700?l=en"
    }
  },

  {
    title: "VXCODE",
    subtitle: "Internal CRM & Operations App",
    description:
      "VXCODE is an internal mobile application used for CRM and operational workflows for organizations and cooperatives.",

    contributions: [
      "Adapted and configured existing core modules from previous projects for new client deployments",
      "Performed functional testing, bug fixes and release preparation",
      "Implemented common application modules such as search and filtering for news, events and people, and backend-driven data listings"
    ],

    tech: ["Flutter", "Dart", "GetX", "Firebase"],

    exampleApp: {
      android: "https://play.google.com/store/apps/details?id=com.vxcode.vxtechnica.kjtb&hl=en",
      ios: "https://apps.apple.com/my/app/koperasi-juara-tapah-berhad/id6756619648"
    },

    allApps: {
      android:
        "https://play.google.com/store/apps/collection/cluster?gsr=SldqGHZqVXRsbE0veVU0UTRCTUQ1ZSszVXc9PbICNwoaChZjb20udngxMDAxc21rcm0udnhzdGVwEAcSFwgBEhM2MjM0Mzk2NTUxMTIyNzgzNjcxGACwEgA%3D:S:ANO1ljJwfrE&hl=en",
      ios:
        "https://apps.apple.com/my/developer/vx-ventures-sdn-bhd/id1599026700?l=en"
    }
  }
];


export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProject])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        setActiveProject(null)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [activeProject])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2026</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Firdaus
                  <br />
                  <span className="text-muted-foreground">Azman</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Flutter & Software Developer building
              <span className="text-foreground"> production-ready applications</span> for
              <span className="text-foreground"> real-world systems</span> and
              <span className="text-foreground"> organizations</span>.
              </p>


                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Malaysia</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Flutter Developer</div>
                  <div className="text-muted-foreground">@ VX Brands Sdn Bhd</div>
                  <div className="text-xs text-muted-foreground">July 2024 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Flutter", "Dart", "Xcode", "Android Studio", "Firebase", "Github", "AppStore Connect", "Google Play Console","REST API","GetX"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2024 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "July 2024",
                  role: "Flutter Developer Intern",
                  company: "VX Brands Sdn Bhd",
                  description: "Worked on production Flutter applications for CRM systems, focusing on feature development, API integration and application maintenance.",
                  tech: ["Flutter", "Dart", "GetX", "REST API", "Firebase", "Android Studio", "Xcode", "Google Play Console", "App Store Connect"],
                },
                {
                  year: "January 2025",
                  role: "Flutter Developer Part-Time",
                  company: "VX Brands Sdn Bhd",
                  description: "Prepared and released multiple Flutter mobile applications by adapting existing codebases, performing testing and handling Android and iOS build and store submissions.",
                  tech: ["Flutter", "Dart", "Firebase", "Android Studio", "Xcode", "Google Play Console", "App Store Connect","Github"],
                  },
                // {
                //   year: "2021",
                //   role: "Full Stack Developer",
                //   company: "Stripe",
                //   description: "Developed payment infrastructure and merchant-facing dashboard features.",
                //   tech: ["Ruby", "React", "PostgreSQL"],
                // },
                // {
                //   year: "2019",
                //   role: "Software Engineer",
                //   company: "Airbnb",
                //   description: "Created booking flow optimizations and host management tools.",
                //   tech: ["React", "Node.js", "MySQL"],
                // },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Selected Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={index}
                  onClick={() => setActiveProject(project)}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-medium">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.subtitle}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>View details</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:firdausazman3011@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">firdausazman3011@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@firdausazman3011", url: "https://github.com/firdausazman3011" },
                  { name: "LinkedIn", handle: "Firdaus Azman", url: "https://www.linkedin.com/in/muhamad-firdaus-azman-aa64aa30b/" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Firdaus Azman. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev by Firdaus Azman</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button 
              onClick={() => window.open("https://wa.me/601160955100", "_blank")}
              className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Popup / Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveProject(null)
            }
          }}
        >
          <div className="bg-background border border-border rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-lg font-medium">{activeProject.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {activeProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded hover:bg-muted"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-6 overflow-y-auto max-h-[calc(80vh-72px)]">
              <div className="space-y-2">
                <h4 className="font-medium">Overview</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">My Contributions</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {activeProject.contributions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {(activeProject.exampleApp || activeProject.allApps) && (
                <div className="space-y-4">
                  {activeProject.exampleApp && (
                    <div className="space-y-2">
                      <h4 className="font-medium">App Links</h4>
                      <div className="flex items-center gap-4">
                        {activeProject.exampleApp.android && (
                          <a
                            href={activeProject.exampleApp.android}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Android app"
                          >
                            <FaGooglePlay className="w-5 h-5" />
                          </a>
                        )}

                        {activeProject.exampleApp.ios && (
                          <a
                            href={activeProject.exampleApp.ios}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="iOS app"
                          >
                            <FaApple className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {activeProject.allApps && (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2">
                        {activeProject.allApps.android && (
                          <a
                            href={activeProject.allApps.android}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            View more company apps on Google Play
                          </a>
                        )}

                        {activeProject.allApps.ios && (
                          <a
                            href={activeProject.allApps.ios}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            View more company apps on App Store
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
