import "./Main.css";
import { PrimaryFeatures } from "./PrimaryFeatures";

const Main = () => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Bountiful
            <span className="relative whitespace-nowrap text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
              >
                <path
                  d={`M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 
              12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 
              27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 
              7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 
              4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 
              4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 
              7.584 19.787 1.924 20.814 1.98 24.557 
              1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 
              2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z`}
                ></path>
              </svg>
              <span className="relative ">
                {" "}
                made simple <br />
              </span>
            </span>
            for all businesses.
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg tracking-tight text-slate-700">
            Manage all your memberships from one place. Enjoy the benefits from
            all companies and share your points with others.
          </p>
        </div>
        <div className="mt-1 flex justify-center gap-x-6">
          <a
            className={`group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold 
          focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 
          text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900`}
            href="/userregister"
          >
            Get Started Today
          </a>
          <a
            className={`group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none 
          ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 
          focus-visible:outline-blue-600 focus-visible:ring-slate-300`}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
            </svg>
            <span className="ml-3">Watch video</span>
          </a>
        </div>

        <div className="mt-40 lg:mt-40 mb-5">
          <p className="font-display text-center text-slate-900">
            Trusted by these six companies so far
          </p>
          {
            // eslint-disable-next-line
          }<ul
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            <li>
              {
                // eslint-disable-next-line
              }<ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                <li className="flex">
                  <img
                    alt="Transistor"
                    src="https://salient.tailwindui.com/_next/static/media/transistor.7274e6c3.svg"
                    width="158"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
                <li className="flex">
                  <img
                    alt="Tuple"
                    src="https://salient.tailwindui.com/_next/static/media/tuple.74eb0ae0.svg"
                    width="105"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
                <li className="flex">
                  <img
                    alt="StaticKit"
                    src="https://salient.tailwindui.com/_next/static/media/statickit.d7937794.svg"
                    width="127"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
              </ul>
            </li>
            <li>
              {
                // eslint-disable-next-line
              }<ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                <li className="flex">
                  <img
                    alt="Mirage"
                    src="https://salient.tailwindui.com/_next/static/media/mirage.18d2ec4e.svg"
                    width="138"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
                <li className="flex">
                  <img
                    alt="Laravel"
                    src="https://salient.tailwindui.com/_next/static/media/laravel.7deed17e.svg"
                    width="136"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
                <li className="flex">
                  <img
                    alt="Statamic"
                    src="https://salient.tailwindui.com/_next/static/media/statamic.6da5ebfb.svg"
                    width="147"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    style={{ color: `transparent` }}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <PrimaryFeatures/>
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
        >
          <img
            alt="background-faqs"
            src="https://salient.tailwindui.com/_next/static/media/background-faqs.55d2e36a.jpg"
            width="1558"
            height="946"
            decoding="async"
            data-nimg="1"
            className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
            loading="lazy"
            style={{ color: "transparent" }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2
                id="faq-title"
                className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
              >
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                If you can’t find what you’re looking for, email our support
                team and if you’re lucky someone will get back to you.
              </p>
            </div>
            {
              // eslint-disable-next-line
            }<ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
            >
              <li>
                {
                  // eslint-disable-next-line
                }<ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Why companeis should register in your website?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Well, customers' loyalty systems are very popular, and
                      with us, they don't have to have their systems.{" "}
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can I pay for my subscription via purchase order?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Absolutely, we are happy to take your money in all forms.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      How do I apply for a job at Bountiful?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      We only hire our customers, so subscribe for a minimum of
                      6 months and then let’s talk.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                {
                  // eslint-disable-next-line
                }<ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Why users should register in your website?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Here you will find a group of companies in one place, so
                      you don't have to register in each company separately.{" "}
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What tiers do you have?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      For now, we have four tiers, you will start any membership
                      with a Bronze tier. You can upgrade your tier to Silver,
                      Gold, and Platinum by collecting tiers points.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      I found other companies called Bountiful, are you sure you
                      can use this name?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Honestly not sure at all. We haven’t actually incorporated
                      or anything, we just thought it sounded cool and made this
                      website.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                {
                  // eslint-disable-next-line
                }<ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What is the difference between tiers points and standard
                      points?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      It's clear, by tiers points your tier will be upgraded. By
                      standard points, you can make a redemption when you reach
                      the minimum exchange points depending on company
                      configurations{" "}
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can we expect more features?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      In life it’s really better to never expect anything at
                      all. But probly yes.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      I lost my password, how do I get into my account?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Send us an email and we will send you a copy of our latest
                      password spreadsheet so you can find your information.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section
          id="get-started-today"
          className="relative overflow-hidden bg-blue-600 py-32"
        >
          <img
            alt="background-call-to-action"
            src="https://salient.tailwindui.com/_next/static/media/background-call-to-action.6a5a5672.jpg"
            width="2347"
            height="1244"
            decoding="async"
            data-nimg="1"
            className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            loading="lazy"
            style={{ color: "transparent" }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Get started today
              </h2>
              <p className="mt-4 text-lg tracking-tight text-white">
                It’s time to take control of your books. Buy our software so you
                can feel like you’re doing something productive.
              </p>
              <a
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-10"
                href="/userregister"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <img
              src="logo512.png"
              height="40px"
              className="mx-auto h-10 w-auto"
              alt="logo"
            />
            <nav className="mt-10 text-sm" aria-label="quick links">
              <div className="-my-1 flex justify-center gap-x-6">
                <a
                  className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#features"
                >
                  Features
                </a>
                <a
                  className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#faq"
                >
                  Frequently asked questions
                </a>
                <a
                  className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/userregister"
                >
                  Start today
                </a>
              </div>
            </nav>
          </div>
          <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
            <div className="flex gap-x-6">
              <a
                className="group"
                aria-label="TaxPal on Twitter"
                href="https://twitter.com"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                >
                  <path
                    d={`M8.29 20.251c7.547 0 11.675-6.253 
                    11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 
                    1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 
                    5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 
                    3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84`}
                  ></path>
                </svg>
              </a>
              <a
                className="group"
                aria-label="TaxPal on GitHub"
                href="https://github.com"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                >
                  <path
                    d={`M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 
                  9.504.5.092.682-.217.682-.483 
                  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 
                  1.531 1.032.892 1.53 2.341 1.088 
                  2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 
                  .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 
                  1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 
                  12.017C22 6.484 17.522 2 12 2Z`}
                  ></path>
                </svg>
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500 sm:mt-0">
              Copyright © 2023 Bountiful. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Main;
