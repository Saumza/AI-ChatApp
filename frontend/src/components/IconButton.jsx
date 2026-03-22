import { Button } from "./ui/button.jsx"
import { ArrowUpIcon } from "lucide-react"

export function ButtonRounded({...props}) {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full" {...props}>
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
