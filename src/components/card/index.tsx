import { ReactNode } from "react"

interface CardProps {
  children: ReactNode;
  clickable?: boolean;
}

export default function Card({children, clickable}: CardProps) {
  return (
    <div>{children}</div>
  )
}