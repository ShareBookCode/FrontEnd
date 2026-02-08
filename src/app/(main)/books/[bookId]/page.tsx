export default async function Page({
  params,
}: {
  params: Promise<{ bookId: unknown }>
}) {
  console.log(params)
  return <div>Welcome book</div>
}
