import LogoIcon from '@/assets/logo.svg'
import MenuIcon from '@/assets/icon-menu.svg'

export const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <LogoIcon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition">
                Features
              </a>
              <a
                href="#"
                className=" text-white/70 hover:text-white transition"
              >
                Developers
              </a>
              <a
                href="#"
                className=" text-white/70 hover:text-white transition"
              >
                Pricing
              </a>
              <a
                href="#"
                className=" text-white/70 hover:text-white transition"
              >
                Careers
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <button className="realtive py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]">
              <div className="absolute inset-0">
                <div className="border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
                <div className=" rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
                <div className="absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,0.7)_inset] rounded-lg"></div>
              </div>
              <span>Join WaitList</span>
            </button>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
