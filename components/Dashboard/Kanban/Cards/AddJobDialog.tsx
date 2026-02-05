'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon } from 'lucide-react';
import { createJob } from '@/app/features/jobs/job.action';
import { Textarea } from '@/components/ui/textarea';

export default function AddJobDialog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    salary: '' + '€',
    skills: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createJob({
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex font-bold items-center">
        <PlusIcon /> New Job
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center">Create New Job</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className=" flex-1 grid gap-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                placeholder="Company name"
                id="company"
                value={form.company}
                onChange={handleChange('company')}
              />
            </div>

            <div className="flex-1 grid gap-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                placeholder="Fullstack Developer"
                id="title"
                value={form.title}
                onChange={handleChange('title')}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 grid gap-2">
              <Label htmlFor="skills">Skills *</Label>
              <Input
                id="skills"
                placeholder="one, two, three"
                value={form.skills}
                onChange={handleChange('skills')}
              />
            </div>
            <div className="flex-1 grid gap-2 ">
              <Label htmlFor="salary">Salary €</Label>
              <Input
                placeholder="1234"
                type="number"
                id="salary"
                value={form.salary}
                onChange={handleChange('salary')}
              />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            className="min-h-40"
            rows={4}
            id="description"
            placeholder="Short description about the job... "
            spellCheck
            value={form.description}
            onChange={handleChange('description')}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
