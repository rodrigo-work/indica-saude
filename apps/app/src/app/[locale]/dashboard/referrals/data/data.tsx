import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleCheck,
  Clock,
  HelpCircle,
  XCircle
} from 'lucide-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
]

export const statuses = [
  {
    value: 'APPROVED',
    label: 'APPROVED',
    icon: HelpCircle
  },
  {
    value: 'PAID',
    label: 'PAID',
    icon: Circle
  },
  {
    value: 'PENDING',
    label: 'PENDING',
    icon: Clock,
    color: 'text-orange-500'
  },
  {
    value: 'SCHEDULED',
    label: 'SCHEDULED',
    icon: CheckCircle
  },
  {
    value: 'CANCELLED',
    label: 'CANCELLED',
    icon: XCircle,
    color: 'text-red-500'
  },
  {
    value: 'COMPLETED',
    label: 'COMPLETED',
    icon: CircleCheck
  }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp
  }
]
