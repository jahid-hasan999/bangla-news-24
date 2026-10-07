'use client';
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  
} from '@heroui/react';
import Link from 'next/link';

import {  signUp } from '@/lib/auth-client';
import React from 'react';

const SignUpPage = () => {
 const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   const formData = new FormData(e.currentTarget);

   const data = Object.fromEntries(formData.entries());

   console.log('Form Data:', data);

   const { data: resData, error } = await signUp.email({
     email: data.email as string,
     password: data.password as string,
     name: data.name as string,
     callbackURL: '/',
   });

   if (error) {
     console.log('ERROR:', JSON.stringify(error, null, 2));
     console.log('ERROR MESSAGE:', error.message);
     console.log('ERROR CODE:', error.code);
     console.log('ERROR STATUS:', error.status);
     return;
   }

   console.log('Sign Up Success:', resData);
 };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-md animate-[fadeIn_0.7s_ease-out]">
        {/* Border Glow */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-60 blur-[2px]" />

        <div className="relative rounded-3xl border border-white/10 bg-[#111318]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-110 hover:rotate-3">
              A
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Create your account and get started today.
            </p>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Name */}
            <TextField
              isRequired
              name="name"
              validate={value => {
                if (value.length < 3) {
                  return 'Name must be at least 3 characters';
                }

                return null;
              }}
              className="group"
            >
              <Label className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-cyan-400">
                নাম
              </Label>

              <Input
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/10"
              />

              <FieldError className="mt-1 text-xs text-red-400" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={value => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return 'Please enter a valid email address';
                }

                return null;
              }}
              className="group"
            >
              <Label className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-cyan-400">
                ইমেইল
              </Label>

              <Input
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/10"
              />

              <FieldError className="mt-1 text-xs text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={value => {
                if (value.length < 8) {
                  return 'Password must be at least 8 characters';
                }

                if (!/[A-Z]/.test(value)) {
                  return 'Password must contain at least one uppercase letter';
                }

                if (!/[0-9]/.test(value)) {
                  return 'Password must contain at least one number';
                }

                return null;
              }}
              className="group"
            >
              <Label className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-cyan-400">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/10"
              />

              <Description className="mt-2 text-xs leading-relaxed text-gray-500">
                কমপক্ষে ৮টি অক্ষর, ১টি uppercase letter এবং ১টি number থাকতে
                হবে।
              </Description>

              <FieldError className="mt-1 text-xs text-red-400" />
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
            >
              সাইন আপ
            </Button>
          </Form>

          {/* Footer */}
          <div className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
};

export default SignUpPage;
