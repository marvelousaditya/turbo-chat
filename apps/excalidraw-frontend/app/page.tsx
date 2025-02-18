import React from "react";
import {
  Pencil,
  Share2,
  Users,
  Lock,
  Shapes,
  Cloud,
  ArrowRight,
  Github,
} from "lucide-react";
import Link from "next/link";
function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-50 to-blue-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shapes className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Excalidraw</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600">
              Features
            </a>
            <a
              href="#community"
              className="text-gray-600 hover:text-purple-600"
            >
              Community
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">
              Pricing
            </a>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Try Now
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Virtual Whiteboard for
                <span className="text-purple-600"> Seamless Collaboration</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create, collaborate, and share beautiful hand-drawn diagrams
                with your team in real-time.
              </p>
              <div className="flex space-x-4">
                <Link href={"/signup"}>
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                    Sign Up <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
                <Link href={"/signin"}>
                  <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80"
                alt="Collaborative drawing"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Why Choose Excalidraw?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Pencil className="w-8 h-8 text-purple-600" />}
              title="Intuitive Drawing"
              description="Simple yet powerful drawing tools that feel natural and responsive."
            />
            <FeatureCard
              icon={<Share2 className="w-8 h-8 text-purple-600" />}
              title="Easy Sharing"
              description="Share your drawings with a simple link or export to various formats."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-purple-600" />}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, anywhere in the world."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-purple-600" />}
              title="Secure"
              description="End-to-end encryption ensures your drawings remain private."
            />
            <FeatureCard
              icon={<Cloud className="w-8 h-8 text-purple-600" />}
              title="Cloud Storage"
              description="Automatically save and access your drawings from any device."
            />
            <FeatureCard
              icon={<Shapes className="w-8 h-8 text-purple-600" />}
              title="Rich Libraries"
              description="Access a wide range of shapes, templates, and custom libraries."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Creating?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who use Excalidraw to bring their ideas to
            life. No credit card required.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shapes className="w-6 h-6 text-purple-600" />
              <span className="text-gray-800 font-semibold">Excalidraw</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            © 2024 Excalidraw. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
