import { ErrorTemplate } from '../components/error-template'

export default function Forbidden() {
  return <ErrorTemplate error={403} />
}
