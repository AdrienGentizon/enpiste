import { FormHTMLAttributes } from 'react'

type Props = FormHTMLAttributes<HTMLFormElement>

export default function Form({ className, children, ...props }: Props) {
  return (
    <form className={`flex flex-col gap-1 p-2 ${className}`} {...props}>
      {children}
    </form>
  )
}
