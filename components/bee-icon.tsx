interface BeeIconProps {
  className?: string
  size?: number
  color?: string
}

export function BeeIcon({ className, size = 24, color = "#F6B300" }: BeeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"
        fill={color}
      />
      <path d="M18 10.5C18 9.12 16.88 8 15.5 8H14V9.5H15.5C16.05 9.5 16.5 9.95 16.5 10.5V13.5H18V10.5Z" fill={color} />
      <path d="M6 10.5C6 9.12 7.12 8 8.5 8H10V9.5H8.5C7.95 9.5 7.5 9.95 7.5 10.5V13.5H6V10.5Z" fill={color} />
      <path
        d="M10.5 15H8.5C7.95 15 7.5 14.55 7.5 14V12H6V14C6 15.38 7.12 16.5 8.5 16.5H10.5V18.5H12V16.5H13.5V18.5H15V16.5H15.5C16.88 16.5 18 15.38 18 14V12H16.5V14C16.5 14.55 16.05 15 15.5 15H13.5V13.5H10.5V15Z"
        fill={color}
      />
      <path
        d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
        fill={color}
      />
      <path
        d="M12 13.5C13.1046 13.5 14 12.6046 14 11.5C14 10.3954 13.1046 9.5 12 9.5C10.8954 9.5 10 10.3954 10 11.5C10 12.6046 10.8954 13.5 12 13.5Z"
        fill={color}
      />
    </svg>
  )
}
