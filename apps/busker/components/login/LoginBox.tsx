'use client';
import { signIn } from 'next-auth/react';
import { Input, Button } from '@repo/ui/components/ui';

export default function LoginBox() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await signIn('credentials', { email, password, callbackUrl: '/main' });
  };
  return (
    <form
      className="space-y-7 min-w-xs max-w-md mb-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl font-bold mb-10">Login</h1>
      <Input type="text" placeholder="Email" className="h-12" name="email" />
      <Input
        type="password"
        placeholder="Password"
        className="h-12"
        name="password"
      />
      <Button type="submit" className="w-full bg-blue-400 h-12">
        Login
      </Button>
      <div className="flex items-center text-gray-500 text-sm before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <span className="mx-4">or</span>
      </div>
    </form>
  );
}
