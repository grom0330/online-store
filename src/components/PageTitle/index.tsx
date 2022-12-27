type Props = {
  text: string
}

export default function PageTitle(p: Props) {
  return <h2 className="text-2xl font-bold tracking-tight text-gray-900">{p.text}</h2>
}
