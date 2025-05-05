import { SunIcon } from "lucide-react"

function Logo() {
  return (
    <div className="flex justify-center gap-2 w-full p-4 items-center">
      <div className="flex h-6 w-6 p-1 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <SunIcon />
      </div>
      <span className="font-bold">APP NAME</span>
    </div>
  )
}

export default Logo