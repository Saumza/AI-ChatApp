import { Button } from "./ui/button.jsx"
import { Link } from "react-router-dom";

export function ButtonDefault({
    children,
    type = "submit",
    className,
    ...props
}) {
    return <Button type={type} className={className} {...props}>{children}</Button>
}


export function ButtonAsChild({
    className,
    children
}) {
    return (
        <Button asChild className={className}>
            <Link href="/login">{children}</Link>
        </Button>
    )
}