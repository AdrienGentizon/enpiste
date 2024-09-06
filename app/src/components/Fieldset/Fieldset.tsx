import { FieldsetHTMLAttributes } from 'react'

type Props = FieldsetHTMLAttributes<HTMLFieldSetElement>

export default function Fieldset({ className, children, ...props }: Props) {
  return (
    <fieldset className={`flex flex-col gap-2 ${className}`} {...props}>
      {children}
    </fieldset>
  )
}
