import Image from 'next/image';

const Footer = ({ profile }: { profile: any }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant border-opacity-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] gap-gutter">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <a className="flex items-center gap-2 h-8 group" href="#">
              <div className="relative h-full aspect-square">
                <Image src="/assets/images/MJDBuilt_logo.png" alt="Logo" fill sizes="32px" className="object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              </div>
              <span className="font-label-caps text-label-caps text-on-surface font-bold">{profile.logoText}</span>
            </a>
            <span className="text-xs font-mono text-on-surface-variant opacity-50 border border-on-surface-variant/20 rounded px-2 py-0.5">V5.0</span>
          </div>
          <p className="text-on-surface-variant font-body-md mt-4">© {currentYear} {profile.firstName} {profile.lastName}. {profile.footerText}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-8 md:mt-0">
          {profile.socials.map((social: any) => (
            <a key={social.id} className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href={social.url} target="_blank" rel="noreferrer">{social.platform}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
