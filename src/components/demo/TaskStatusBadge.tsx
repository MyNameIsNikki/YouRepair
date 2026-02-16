import { Badge } from '../ui/badge';

interface TaskStatusBadgeProps {
  status: 'pending' | 'in-progress' | 'completed' | 'review';
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Ожидает',
      className: 'bg-gray-200 text-gray-700'
    },
    'in-progress': {
      label: 'В работе',
      className: 'bg-blue-100 text-blue-700'
    },
    completed: {
      label: 'Выполнена',
      className: 'bg-green-100 text-green-700'
    },
    review: {
      label: 'На проверке',
      className: 'bg-yellow-100 text-yellow-700'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
