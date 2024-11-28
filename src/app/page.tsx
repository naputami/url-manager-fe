import Link from "next/link";
import { Button } from "./_components/ui/button";
import { Bot, LayoutDashboard, Tag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-primary-foreground text-slate-900 min-h-screen flex flex-col items-center">
      <header className="w-full max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">URL Manager</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="hover:underline"><Button variant="link">Login</Button></Link>
            </li>
            <li>
              <Link href="/register"><Button>Register</Button></Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 text-center">
        <section className="mt-16">
          <h2 className="text-4xl font-extrabold leading-tight">
            Simplify Your URL Management
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            Categorize and organize your links with ease. Leverage AI to generate titles and summaries for quick insights
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <Button className="py-6 px-8 font-semibold text-lg tracking-tight">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="mt-24">
          <h3 className="text-3xl font-bold">Features</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg flex flex-col items-center">
              <Tag className="mb-2" />
              <h4 className="text-xl font-semibold text-primary">Smart Categorization</h4>
              <p className="mt-2 text-slate-400">Automatically group your links by categories for better organization.</p>
            </div>
            <div className="p-6 bg-card rounded-lg flex flex-col items-center">
              <Bot className="mb-2" />
              <h4 className="text-xl font-semibold text-primary">AI-Powered Insights</h4>
              <p className="mt-2 text-slate-400">Generate meaningful titles and summaries with AI to save time.</p>
            </div>
            <div className="p-6 bg-card rounded-lg flex flex-col items-center">
              <LayoutDashboard className="mb-2" />
              <h4 className="text-xl font-semibold text-primary">Simple Interface</h4>
              <p className="mt-2 text-slate-400">A clean and intuitive design that makes URL management effortless.</p>
            </div>
          </div>
        </section>

        <section id="call-to-action" className="mt-24">
          <h3 className="text-3xl font-bold">Ready to Simplify Your URL Management?</h3>
          <p className="mt-4 text-lg text-secondary-foreground">
            Start categorizing and summarizing your URLs effortlessly. Sign up now and experience the power of AI-driven link management.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary px-10 py-6 text-lg font-semibold">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="w-full bg-primary py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-lg font-semibold text-primary-foreground">Contact Us</h4>
          <p className="mt-2 text-primary-foreground">support@urlmanager.com</p>
          <p className="text-primary-foreground">+1 800 123 456</p>
        </div>
      </footer>
    </div>
  );
}
