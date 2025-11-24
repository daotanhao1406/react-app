import { Button } from "antd";
import Link from "antd/es/typography/Link";

export default function Navbar() {
  const navigation = [
    {
      title: "Features",
      path: "javascript:void(0)",
      isDrapdown: false,
    },
    { title: "Integrations", path: "javascript:void(0)", isDrapdown: false },
    { title: "Customers", path: "javascript:void(0)", isDrapdown: false },
    { title: "Pricing", path: "javascript:void(0)", isDrapdown: false },
  ];

  return (
    <>
      <nav
        className={`relative z-20 w-full md:static md:text-sm md:border-none`}
      >
        <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <img
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </a>
          </div>
          <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0`}>
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <Link key={idx}>
                    <a href={item.path}>{item.title}</a>
                  </Link>
                );
              })}
              <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                <Button>Login</Button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
