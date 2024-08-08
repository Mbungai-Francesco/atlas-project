interface DescriptionProps {
  title : string,
  description ?: string,
  children ?: React.ReactNode
}

function Description ({title, description}: DescriptionProps) {
  return (
    <>
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="opacity-60 text-base font-normal">{description}</p>
    </>
  )
}

export default Description;