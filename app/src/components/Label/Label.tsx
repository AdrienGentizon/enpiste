import { LabelHTMLAttributes } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ className, children, ...props }: Props) {
  return (
    <label className={`font-semibold leading-4 ${className}`} {...props}>
      {children}
    </label>
  )
}
