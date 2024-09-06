import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={`rounded border px-2 py-1 font-light ${className}`}
      {...props}
    />
  )
}
