import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import { FaGithub, FaYoutube } from "react-icons/fa"

export default function page() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-bold">Test links</h1>
        <div className=" space-x-2">
          <Link href="/dashboard" className="underline">
            /dashboard
          </Link>
          <Link href="/profile" className=" underline">
            /profile
          </Link>
        </div>
      </div>
      <div className=" border-t pt-10">
        <h1 className="text-xl font-bold">Boilerplate Project.</h1>
        <p>Supabase | Oauth (Google, Github) | Google Cloud Console | Vercel</p>
        <div className="mt-5">
          <div className="flex items-center gap-5">
            <Link
              href={"https://www.youtube.com/@r34ct4/videos"}
              target="_blank"
            >
              <FaYoutube className="h-8 w-8 hover:scale-105" />
            </Link>
            <Link
              href={"https://github.com/AITRUPEACE"}
              aria-disabled
              target="_blank"
            >
              <FaGithub className="h-8 w-8 hover:scale-105" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
