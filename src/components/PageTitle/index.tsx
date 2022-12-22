type Props = {
  text: string
}

export default function PageTitle(p: Props) {
  return <h2 className="text-3xl font-bold underline">{p.text}</h2>
}
