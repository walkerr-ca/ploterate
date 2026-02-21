import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(info)/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(info)/about"!</div>
}
