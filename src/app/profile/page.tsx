'use client';

import Link from 'next/link';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';

import { authClient } from '@/lib/auth-client';

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;

    const { data, error } = await authClient.updateUser({
      name,
    });

    if (error) {
      console.log('Update Error:', error);
      return;
    }

    console.log('Profile Updated:', data);
  };

  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <p className="mb-4">You are not logged in.</p>

          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center text-neutral-900 shadow-xl sm:p-8">
        <div className="mb-6">
          <h1 className="break-words text-2xl font-bold sm:text-3xl">
            {user.name}
          </h1>

          <p className="mt-1 break-all text-sm text-neutral-500">
            {user.email}
          </p>
        </div>

        <Form
          className="flex flex-col gap-4 text-left"
          onSubmit={handleUpdateProfile}
        >
          <TextField
            isRequired
            name="name"
            defaultValue={user.name}
            validate={value => {
              if (value.trim().length < 3) {
                return 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে';
              }

              return null;
            }}
          >
            <Label>নাম</Label>

            <Input name="name" placeholder="John Doe" className="w-full" />

            <FieldError />
          </TextField>

          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ProfilePage;
