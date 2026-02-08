export default async function Page({
  params,
}: {
  params: Promise<{ userId: unknown }>
}) {
  console.log(params)
  return <div>Welcome user</div>
}
