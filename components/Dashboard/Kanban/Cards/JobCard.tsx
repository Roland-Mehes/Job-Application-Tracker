import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/types/kanban';
import { Move } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import '@/app/styles/job-card.css';

export default function JobCard({
  jobTitle,
  companyName,
  description,
  salary,
  skills,
  interviewDate,
  createdAt: date,
}: Job) {
  const createdAt = new Date(date).toLocaleString('en-EN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card
      className="job-card w-full flex flex-col gap-2 bg-card text-card-foreground border-l-4"
      style={{ borderLeftColor: 'var(--column-color)' }}
    >
      <CardHeader className="cursor-move flex items-center justify-between relative ">
        <CardTitle className="text-md font-semibold ">{jobTitle}</CardTitle>
        <Move size={16} color="var(--column-color)" />
      </CardHeader>
      <Separator className="h-px bg-gray-200 dark:bg-white/10 my-2.5" />
      <CardContent className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <p className="font-bold">{companyName}</p>
          {salary && <p className="font-medium ">💰 {salary} €</p>}
        </div>

        {description && (
          <CardDescription className="line-clamp-2 text-pretty p-3">
            {description}
          </CardDescription>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs shadow-accent-foreground "
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}
        {interviewDate && (
          <p
            className="text-sm font-medium mt-1"
            style={{ color: 'var(--column-color)' }}
          >
            📅 Interview: {interviewDate}
          </p>
        )}
      </CardContent>
      <Separator className="h-p border-border my-2.5" />
      <CardFooter>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Created at:</span>
            <span className="text-xs text-muted-foreground">{createdAt} </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Modified at:</span>
            <span className="text-xs text-muted-foreground">{createdAt} </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
