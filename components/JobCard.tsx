import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenuSeparator } from './ui/dropdown-menu';

interface JobCardProps {
  jobTitle: string;
  companyName: string;
  description: string;
  salary: string;
  skills: string[];
  interviewDate?: string; // only on interview column
}

const JobCard = ({
  jobTitle,
  companyName,
  description,
  salary,
  skills,
  interviewDate,
}: JobCardProps) => {
  return (
    <Card
      className="w-full flex flex-col gap-2 bg-card text-card-foreground border-l-4 cursor-pointer"
      style={{
        borderColor: 'var(--column-color, var(--border))',
      }}
    >
      <CardHeader>
        <CardTitle className="text-md font-semibold ">
          <h3>{jobTitle}</h3>
        </CardTitle>
        <DropdownMenuSeparator className="h-px bg-border" />
      </CardHeader>

      <CardContent className="flex flex-col gap-1 text-sm">
        <p className="text-muted-foreground">{companyName}</p>

        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>

        <p className="font-medium">💰 {salary}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
        {interviewDate && (
          <p
            className="text-sm font-medium mt-1"
            style={{ color: 'var-(--column-color)' }}
          >
            📅 Interview: {interviewDate}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
