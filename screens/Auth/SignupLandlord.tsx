// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useRegister } from '../../services/auth/hooks';

// const PASSWORD_REGEX =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// export const SignupLandlord: React.FC = () => {
//   const navigate = useNavigate();

//   const [role, setRole] = useState<'LANDLORD'>('LANDLORD');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [formError, setFormError] = useState('');

//   const { register, loading: isLoading, error } = useRegister();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError('');

//     if (!firstName.trim()) {
//       setFormError('First name is required');
//       return;
//     }

//     if (!lastName.trim()) {
//       setFormError('Last name is required');
//       return;
//     }

//     if (!PASSWORD_REGEX.test(password)) {
//       setFormError(
//         'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
//       );
//       return;
//     }

//     try {
//       await register({
//         firstName,
//         lastName,
//         email,
//         password,
//         phoneNumber: '',
//         role
//       });

//       navigate('/verify', { state: { email } });
//     } catch {
//       console.error('Registration failed');
//     }
//   };

//   return (
//     <div className="bg-[#f6f8f6] dark:bg-background-dark font-display text-primary dark:text-white antialiased">
//       {/* HEADER */}
//       <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7f3eb] dark:border-[#1e3a29] bg-white dark:bg-[#102216] px-6 lg:px-10 py-4">
//         <Link to="/" className="flex items-center gap-4">
//           <span className="material-symbols-outlined text-3xl text-accent">forest</span>
//           <h2 className="text-xl font-bold uppercase">TerraRent</h2>
//         </Link>

//         <Link
//           to="/login"
//           className="rounded-lg border px-6 py-2 text-sm font-bold hover:bg-[#e7f3eb] dark:hover:bg-[#1a3525]"
//         >
//           Log In
//         </Link>
//       </header>

//       {/* MAIN */}
//       <main className="flex min-h-[calc(100vh-65px)]">
//         {/* LEFT */}
//         <div className="hidden lg:flex w-1/2 bg-[#f0f7f2] dark:bg-[#0c1a11] p-12 flex-col justify-center">
//           <h1 className="text-4xl font-bold mb-6">
//             Unlock the potential of your property.
//           </h1>
//           <p className="text-lg opacity-80">
//             Join TerraRent’s trusted network of landlords and agents.
//           </p>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-white dark:bg-[#102216]">
//           <div className="w-full max-w-lg">
//             <h2 className="text-3xl font-bold mb-2">Create Partner Account</h2>
//             <p className="text-sm opacity-70 mb-8">
//               Register as a landlord or property agent.
//             </p>

//             {(formError || error) && (
//               <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold">
//                 {formError || error}
//               </div>
//             )}

//             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//               {/* ROLE */}
//               <div className="grid grid-cols-2 gap-4">
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     className="sr-only peer"
//                     checked
//                     readOnly
//                   />
//                   <div className="p-4 border rounded-xl peer-checked:border-accent">
//                     <span className="material-symbols-outlined text-accent">
//                       key
//                     </span>
//                     <p className="font-bold">Private Landlord</p>
//                   </div>
//                 </label>

//                 <label className="cursor-pointer opacity-50">
//                   <div className="p-4 border rounded-xl">
//                     <span className="material-symbols-outlined">
//                       real_estate_agent
//                     </span>
//                     <p className="font-bold">Property Agent</p>
//                   </div>
//                 </label>
//               </div>

//               {/* INPUTS */}
//               <input
//                 className="input"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={e => setFirstName(e.target.value)}
//                 required
//               />

//               <input
//                 className="input"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={e => setLastName(e.target.value)}
//                 required
//               />

//               <input
//                 className="input"
//                 placeholder="Email Address"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//               />

//               <input
//                 className="input"
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//               />

//               <button
//                 disabled={isLoading}
//                 className="bg-primary text-white font-bold py-4 rounded-lg mt-2 disabled:opacity-50"
//               >
//                 {isLoading ? 'Creating Account...' : 'Create Account'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };



import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../services/auth/hooks';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupLandlord: React.FC = () => {
  const navigate = useNavigate();

  const [role] = useState<'ROLE_LANDLORD'>('ROLE_LANDLORD');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const { register, loading: isLoading, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!firstName.trim()) {
      setFormError('First name is required');
      return;
    }

    if (!lastName.trim()) {
      setFormError('Last name is required');
      return;
    }

    if (!phoneNumber.trim()) {
      setFormError('Phone number is required');
      return;
    }

    // Validate phone number format (10-14 digits, optional + prefix)
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setFormError('Phone number must be 10-14 digits (optional + prefix)');
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
        role
      });

      navigate('/verify', { state: { email } });
    } catch {
      console.error('Registration failed');
    }
  };

  return (
    <div className="bg-[#f6f8f6] dark:bg-background-dark font-display text-primary dark:text-white antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7f3eb] dark:border-[#1e3a29] bg-white dark:bg-[#102216] px-6 lg:px-10 py-4">
        <Link to="/" className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-accent">forest</span>
          <h2 className="text-xl font-bold uppercase">TerraRent</h2>
        </Link>

        <Link
          to="/login"
          className="rounded-lg border px-6 py-2 text-sm font-bold hover:bg-[#e7f3eb] dark:hover:bg-[#1a3525]"
        >
          Log In
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex min-h-[calc(100vh-65px)]">
        {/* LEFT */}
        <div className="hidden lg:flex w-1/2 bg-[#f0f7f2] dark:bg-[#0c1a11] p-12 flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">
            Unlock the potential of your property.
          </h1>
          <p className="text-lg opacity-80">
            Join TerraRent's trusted network of landlords and agents.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-white dark:bg-[#102216]">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-2">Create Partner Account</h2>
            <p className="text-sm opacity-70 mb-8">
              Register as a landlord or property agent.
            </p>

            {(formError || error) && (
              <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold">
                {formError || error}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* ROLE - Fixed as Private Landlord */}
              <div className="p-4 border border-accent rounded-xl bg-accent/5">
                <span className="material-symbols-outlined text-accent">
                  key
                </span>
                <p className="font-bold">Private Landlord</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Register to list and manage your properties
                </p>
              </div>

              {/* INPUTS */}
              <input
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />

              <input
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />

              <input
                className="input"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <input
                className="input"
                placeholder="Phone Number (e.g., +1234567890)"
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />

              {/* PASSWORD WITH TOGGLE */}
              <div className="relative">
                <input
                  className="input pr-12"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                disabled={isLoading}
                className="bg-primary text-white font-bold py-4 rounded-lg mt-2 disabled:opacity-50 hover:bg-primary-hover transition-colors"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};