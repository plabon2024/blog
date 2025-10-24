import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center pt-48">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {children}
    </div>
  );
};

export default AuthLayout;
