import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../services/auth/hooks';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupRenter: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formError, setFormError] = useState('');

  const { register, loading: isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const nameParts = fullName.trim().split(' ').filter(Boolean);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');

    if (!firstName) {
      setFormError('Full name is required');
      return;
    }

    if (!lastName) {
      setFormError('Please enter both first and last name');
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setFormError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role: 'RENTER'
      });

      navigate('/verify', { state: { email } });
    } catch {
      console.error('Registration failed');
    }
  };

  return (
    <div className="bg-[#f8f7f6] dark:bg-background-dark text-text-main dark:text-gray-100 min-h-screen flex flex-col font-display antialiased">
      {/* HEADER */}
      <header className="w-full border-b border-[#f3eee7] dark:border-white/10 px-6 py-4 lg:px-10 bg-white/50 dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-accent">
              forest
            </span>
            <h2 className="text-xl font-extrabold uppercase tracking-tight">
              TerraRent
            </h2>
          </Link>

          <Link
            to="/login"
            className="rounded-lg px-5 py-2 text-sm font-bold hover:bg-white dark:hover:bg-white/10"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md bg-white dark:bg-white/5 rounded-2xl shadow-xl border border-white/40 dark:border-white/5 p-6 md:p-10">
          <h1 className="text-3xl font-extrabold mb-2">Create an account</h1>
          <p className="text-accent mb-6">
            Join TerraRent to find verified rental homes.
          </p>

          {(formError || error) && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold mb-4">
              {formError || error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-bold">Full Name</label>
              <input
                className="w-full mt-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent"
                placeholder="e.g. Jane Doe"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold">Email Address</label>
              <input
                className="w-full mt-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-bold text-primary dark:text-gray-200">Password</label>
              <div className="relative">
                <input
                  className="w-full pr-12 pl-4 py-3 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-sand-light/10 dark:bg-white/5 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-base"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-text-muted mt-1">
                Min 8 chars, uppercase, lowercase, number & symbol
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
  <label className="text-sm font-bold text-primary dark:text-gray-200">Phone Number</label>
  <input
    className="w-full pl-3.5 pr-4 py-3 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-sand-light/10 dark:bg-white/5 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-base"
    placeholder="+2348012345678"
    type="tel"
    value={phoneNumber}
    onChange={e => setPhoneNumber(e.target.value)}
    pattern="^\+?[0-9]{10,14}$"
    required
  />
</div>


            <button
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3.5 transition-all disabled:opacity-50"
              type="submit"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
