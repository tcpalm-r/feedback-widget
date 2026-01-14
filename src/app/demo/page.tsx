import Link from "next/link";
import { FeedbackWidget } from "@/components/FeedbackWidget";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
                Demo App
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Settings
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                <span className="sr-only">Notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Demo Page</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Test the feedback widget by selecting various interactive elements on this page.
          </p>
        </div>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                Track your performance with detailed analytics and insights.
              </p>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                Learn more →
              </button>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Automation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                Automate repetitive tasks and save valuable time.
              </p>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                Learn more →
              </button>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Integration</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                Connect with your favorite tools and services.
              </p>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                Learn more →
              </button>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Contact Form</h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 max-w-xl">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Sales</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                  placeholder="How can we help?"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  className="h-4 w-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="subscribe" className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Subscribe to newsletter
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
                <button
                  type="reset"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Primary
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
              Success
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
              Danger
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
              Warning
            </button>
            <button className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700">
              Outline
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Ghost
            </button>
            <button disabled className="px-4 py-2 text-sm font-medium text-zinc-400 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-not-allowed">
              Disabled
            </button>
          </div>
        </section>

        {/* Links Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Links</h2>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Standard Link
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              Subtle Link
            </a>
            <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Bold Link →
            </a>
          </div>
        </section>

        {/* Interactive Elements with Roles */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Interactive Elements</h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
            <div
              role="button"
              tabIndex={0}
              className="inline-block px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
            >
              Div with role=button
            </div>
            <div className="flex items-center space-x-4">
              <div
                role="checkbox"
                tabIndex={0}
                aria-checked="false"
                className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 rounded cursor-pointer hover:border-blue-500"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Custom checkbox (role=checkbox)</span>
            </div>
            <div
              role="tab"
              tabIndex={0}
              className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 cursor-pointer"
            >
              Tab Item
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Data Table</h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    Alice Johnson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    Admin
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    Bob Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    User
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    Carol Davis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full">
                      Inactive
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    Editor
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              © 2026 Demo App. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Widget */}
      <FeedbackWidget />
    </div>
  );
}
