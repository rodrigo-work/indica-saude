import { ErrorTemplate } from '../components/error-template'

export default function Unauthorized() {
  return <ErrorTemplate error={401} />
}
