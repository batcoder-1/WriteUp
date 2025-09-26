import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-900 border-t border-gray-700 text-gray-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo + Connect + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Logo width="100px" />
                </div>
                <p className="mb-4 text-gray-400 text-sm">
                  Building projects, solving problems, and always learning
                </p>
                <p className="mb-2 font-semibold text-gray-200">Connect with me:</p>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/roger5364"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://github.com/batcoder-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/naman-dadhich-377935277/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Linkedin
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-sm font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-gray-300 hover:text-white transition"
                    to="/About"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-sm font-semibold uppercase text-gray-400">
                Support
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-gray-300 hover:text-white transition"
                    to="/Account"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-widest mb-6 text-sm font-semibold uppercase text-gray-400">
                Legals
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-gray-300 hover:text-white transition"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-gray-300 hover:text-white transition"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-300 hover:text-white transition"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
