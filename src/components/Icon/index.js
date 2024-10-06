const Icon = ({ iconName, width = 24, height = 24, ...props }) => {
  return (
    <svg width={width} height={height} {...props}>
      <use xlinkHref={`/images/icons.svg#${iconName}`} />
    </svg>
  )
}

export default Icon
