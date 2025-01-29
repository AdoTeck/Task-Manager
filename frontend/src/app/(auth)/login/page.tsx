import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Please sign in to continue</p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Sign In
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-border hover:border-yellow-500 text-foreground py-2 px-4 rounded-md transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="-380.2 274.7 65.7 65.8"
                  className="w-10 h-10"
                >
                  <circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0" />
                  <circle cx="-347.3" cy="307.1" r="32.4" fill="#fff" />
                  <g>
                    <path
                      d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      fill="none"
                    />
                    <path d="M-370.8 320.3v-26l17 13z" fill="#fbbc05" />
                    <path
                      d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z"
                      fill="#ea4335"
                    />
                    <path
                      d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z"
                      fill="#34a853"
                    />
                    <path d="M-322.8 331.3l-31-24-4-3 35-10z" fill="#4285f4" />
                  </g>
                </svg>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-border hover:border-yellow-500 text-foreground py-2 px-4 rounded-md transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {/* GitHub SVG icon */}
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-500 hover:text-yellow-600 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
