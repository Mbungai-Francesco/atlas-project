import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#09111f]">
      <SignIn />
    </div>
  );
};

export default SignInPage;
