import { useClerk, useUser } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling

function SignInButton() {
  const clerk = useClerk()

  return (
    <Tippy content={"SignIn"}>
      <div onClick={() => clerk.openSignIn({})}
      className="bg-black p-2 rounded-full">
        <LogIn color="white"></LogIn>
      </div>
    </Tippy>
  )
}

export default SignInButton;