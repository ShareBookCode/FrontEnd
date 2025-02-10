import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import { SignUpPassword } from "../SignUpPassword";
import { ForgotPassword } from "../ForgotPassword";
import { SignUpName } from "../SignUpName";
import { GoToEmail } from "../GoToEmail";

export function ChangeScreen({
  activeScreen,
}: {
  activeScreen: string | null;
}) {
  switch (activeScreen) {
    case "signIn":
      return <SignIn />;
    case "goToEmailSignIn":
      return <GoToEmail />;
    case "forgotPassword":
      return <ForgotPassword />;
    case "signUp":
      return <SignUp />;
    case "signUpName":
      return <SignUpName />;
    case "signUpPassword":
      return <SignUpPassword />;
    case "goToEmailSignUp":
      return <GoToEmail />;
    default:
      return <div>No find auth</div>;
  }
}
