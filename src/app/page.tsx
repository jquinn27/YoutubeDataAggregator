"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { isChannel } from "@/hooks/isChannel";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const sanitizedUsername = username.replace("@", "");
    const res = await isChannel(sanitizedUsername);

    if (res) {
      router.push(`/channel/${sanitizedUsername}`);
    } else {
      toast("Error: not a valid channel username");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen min-w-full justify-center pt-24">
      <div className="text-center">
        <h1 className="text-black text-2xl">
          Jack Quinn Youtube Data Aggregator
        </h1>
        <div className="py-8">
          <h2 className="text-black">
            To begin, enter a channels username below
          </h2>
          <div>
            <form className="flex pt-4 gap-4 flex-row" onSubmit={handleSubmit}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="@username"
              />
              <Button>
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <h1>Enter</h1>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
