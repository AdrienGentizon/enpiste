import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={`${className} rounded bg-black px-4 py-2 text-white transition-colors hover:bg-neutral-800`}
      {...props}
    >
      {children}
    </button>
  )
}
