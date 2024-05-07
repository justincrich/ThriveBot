enum LoadingSize {
  Small = 'h-2 w-2',
  Medium = 'h-3 w-3',
  Large = 'h-4 w-4',
}

export const Loading = ({
  size = LoadingSize.Medium,
  className = '',
}: {
  className?: string
  size?: LoadingSize
}): JSX.Element => {
  return (
    <div
      className={`flex shrink space-x-1 justify-center items-center bg-transparent ${className}`}
    >
      <div
        className={`${size} bg-primary rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`${size} bg-primary rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div className={`${size} bg-primary rounded-full animate-bounce`}></div>
    </div>
  )
}

Loading.Size = LoadingSize
