'use client';
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddNewJob = () => {
  const router = useRouter();

  const [company, setCompany] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/kanban/newJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company, title, description }),
      });
      if (!res.ok) throw new Error('Failed to create job');
      setCompany('');
      setTitle('');
      setDescription('');

      router.refresh();
    } catch (e) {
      console.log('Failed to create job', e);
    }

    console.log(company, title, description);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex font-bold">
        <PlusIcon />
        New Job
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            ></Input>

            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></Input>

            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></Input>

            <Button type="submit">Submit</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewJob;
