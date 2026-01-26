import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../services/auth/hooks';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Use the new hook instead of apiService
  const { login, loading: isLoading, error } = useLogin();


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await login({ email, password });

    console.log("AUTH RESPONSE RAW:", response);

      const rawRole = response.user.role;        // ROLE_LANDLORD
    const userRole = rawRole.replace("ROLE_", ""); // LANDLORD

    // Persist auth state
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("role", userRole);

    if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "LANDLORD") {
      navigate("/landlord/dashboard");
    } else if (userRole === "RENTER") {
      navigate("/dashboard");
    } else {
      console.error("Unknown role:", userRole);
    }
  } catch (err) {
    console.error("Login failed", err);
  }
};


  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-text-main">
      <div className="min-h-screen flex w-full">
        {/* Visual Panel */}
        <div className="hidden lg:flex w-1/2 relative bg-primary/10 items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{backgroundImage: 'url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000")'}}
          ></div>
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          <div className="relative z-10 p-12 text-white max-w-xl">
            <div className="mb-8 size-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">forest</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">Find your sanctuary in nature.</h1>
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-md">Join thousands of travelers who have found their perfect escape with TerraRent.</p>
          </div>
        </div>
        
        {/* Form Panel */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark relative">
          <header className="absolute top-0 w-full p-6 lg:p-10 flex justify-between items-center z-10">
            <Link to="/" className="flex items-center gap-2 text-primary dark:text-white">
              <span className="material-symbols-outlined text-3xl">forest</span>
              <h2 className="text-xl font-bold tracking-tight uppercase tracking-tighter">TerraRent</h2>
            </Link>
            <p className="text-sm font-medium text-text-muted">Not a member? <Link to="/select-account" className="text-accent hover:text-accent/80 font-bold ml-1 transition-colors">Sign up now</Link></p>
          </header>
          
          <div className="flex flex-1 items-center justify-center p-6 lg:p-24">
            <div className="w-full max-w-md flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-primary dark:text-white tracking-tight">Welcome Home</h2>
                <p className="text-text-muted text-base lg:text-lg">Log in to manage your bookings and favorites.</p>
              </div>
              
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold">{error}</div>}
                
                <label className="flex flex-col gap-1.5">
                  <span className="text-primary dark:text-white text-sm font-bold ml-1">Email Address</span>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg h-14 pl-11 pr-4 text-base text-primary dark:text-white focus:ring-2 focus:ring-accent transition-all" 
                      placeholder="name@example.com" 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <span className="text-primary dark:text-white text-sm font-bold">Password</span>
                    <Link to="/forgot-password" className="text-xs font-semibold text-accent hover:underline">Forgot Password?</Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input 
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg h-14 pl-11 pr-11 text-base text-primary dark:text-white focus:ring-2 focus:ring-accent transition-all" 
                      placeholder="Enter your password" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required
                    />
                  </div>
                </label>

                <button 
                  disabled={isLoading} 
                  className="mt-2 w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50" 
                  type="submit"
                >
                  {isLoading ? 'Logging in...' : 'Log In'} 
                  <span className="material-symbols-outlined text-[20px]">
                    {isLoading ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </form>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-neutral-100 dark:border-neutral-700"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-neutral-100 dark:border-neutral-700"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors bg-white dark:bg-transparent text-primary dark:text-white font-semibold text-sm">
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors bg-white dark:bg-transparent text-primary dark:text-white font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">apple</span>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLogin } from '../../services/auth/hooks';

// export const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   const { login, loading: isLoading, error } = useLogin();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const response = await login({ email, password });
      
//       // Redirect based on user role
//       // response.data contains { accessToken, user }
//       const userRole = response?.user?.role;
      
//       if (userRole === 'admin') {
//         navigate('/admin/dashboard');
//       } else if (userRole === 'landlord') {
//         navigate('/landlord/dashboard');
//       } else {
//         // Default to renter dashboard
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       console.error('Login failed');
//     }
//   };

//   return (
//     <div className="bg-background-light dark:bg-background-dark font-display antialiased text-text-main">
//       <div className="min-h-screen flex w-full">
//         {/* Visual Panel */}
//         <div className="hidden lg:flex w-1/2 relative bg-primary/10 items-center justify-center overflow-hidden">
//           <div 
//             className="absolute inset-0 z-0 bg-cover bg-center" 
//             style={{backgroundImage: 'url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000")'}}
//           ></div>
//           <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
//           <div className="relative z-10 p-12 text-white max-w-xl">
//             <div className="mb-8 size-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
//               <span className="material-symbols-outlined text-white text-3xl">forest</span>
//             </div>
//             <h1 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">Find your sanctuary in nature.</h1>
//             <p className="text-lg font-medium text-white/90 leading-relaxed max-w-md">Join thousands of travelers who have found their perfect escape with TerraRent.</p>
//           </div>
//         </div>
        
//         {/* Form Panel */}
//         <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark relative">
//           <header className="absolute top-0 w-full p-6 lg:p-10 flex justify-between items-center z-10">
//             <Link to="/" className="flex items-center gap-2 text-primary dark:text-white">
//               <span className="material-symbols-outlined text-3xl">forest</span>
//               <h2 className="text-xl font-bold tracking-tight uppercase tracking-tighter">TerraRent</h2>
//             </Link>
//             <p className="text-sm font-medium text-text-muted">Not a member? <Link to="/select-account" className="text-accent hover:text-accent/80 font-bold ml-1 transition-colors">Sign up now</Link></p>
//           </header>
          
//           <div className="flex flex-1 items-center justify-center p-6 lg:p-24">
//             <div className="w-full max-w-md flex flex-col gap-8">
//               <div className="flex flex-col gap-2">
//                 <h2 className="text-3xl lg:text-4xl font-extrabold text-primary dark:text-white tracking-tight">Welcome Home</h2>
//                 <p className="text-text-muted text-base lg:text-lg">Log in to manage your bookings and favorites.</p>
//               </div>
              
//               <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
//                 {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold">{error}</div>}
                
//                 <label className="flex flex-col gap-1.5">
//                   <span className="text-primary dark:text-white text-sm font-bold ml-1">Email Address</span>
//                   <div className="relative group">
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
//                       <span className="material-symbols-outlined text-[20px]">mail</span>
//                     </div>
//                     <input 
//                       className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg h-14 pl-11 pr-4 text-base text-primary dark:text-white focus:ring-2 focus:ring-accent transition-all" 
//                       placeholder="name@example.com" 
//                       type="email" 
//                       value={email} 
//                       onChange={e => setEmail(e.target.value)} 
//                       required
//                     />
//                   </div>
//                 </label>

//                 <label className="flex flex-col gap-1.5">
//                   <div className="flex justify-between items-center ml-1">
//                     <span className="text-primary dark:text-white text-sm font-bold">Password</span>
//                     <Link to="/forgot-password" className="text-xs font-semibold text-accent hover:underline">Forgot Password?</Link>
//                   </div>
//                   <div className="relative group">
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
//                       <span className="material-symbols-outlined text-[20px]">lock</span>
//                     </div>
//                     <input 
//                       className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg h-14 pl-11 pr-11 text-base text-primary dark:text-white focus:ring-2 focus:ring-accent transition-all" 
//                       placeholder="Enter your password" 
//                       type="password" 
//                       value={password} 
//                       onChange={e => setPassword(e.target.value)} 
//                       required
//                     />
//                   </div>
//                 </label>

//                 <button 
//                   disabled={isLoading} 
//                   className="mt-2 w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50" 
//                   type="submit"
//                 >
//                   {isLoading ? 'Logging in...' : 'Log In'} 
//                   <span className="material-symbols-outlined text-[20px]">
//                     {isLoading ? 'hourglass_empty' : 'arrow_forward'}
//                   </span>
//                 </button>
//               </form>
              
//               <div className="relative flex py-2 items-center">
//                 <div className="flex-grow border-t border-neutral-100 dark:border-neutral-700"></div>
//                 <span className="flex-shrink-0 mx-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Or continue with</span>
//                 <div className="flex-grow border-t border-neutral-100 dark:border-neutral-700"></div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors bg-white dark:bg-transparent text-primary dark:text-white font-semibold text-sm">
//                   <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
//                   Google
//                 </button>
//                 <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors bg-white dark:bg-transparent text-primary dark:text-white font-semibold text-sm">
//                   <span className="material-symbols-outlined text-lg">apple</span>
//                   Apple
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };