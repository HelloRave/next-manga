import FormCard from "@/components/FormCard";
import LoginHookForm from "@/components/LoginHookForm";
import SocialButton from "@/components/SocialButton";
import { GoogleIcon, GithubIcon } from "@/public/icons";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-full flex justify-center my-10">
            <FormCard
                title="Login"
                className="w-1/2 py-10 shadow-md rounded bg-white"
            >
                <LoginHookForm />
                <div className="flex flex-col gap-3 items-center mt-5">
                    <SocialButton
                        title="Continue with GitHub"
                        type="button"
                        className="bg-black text-white hover:opacity-75"
                        provider="github"
                        callbackurl="/"
                    >
                        <GithubIcon />
                    </SocialButton>
                    <SocialButton
                        title="Continue with Google"
                        type="button"
                        className="bg-white text-black hover:opacity-75"
                        provider="google"
                        callbackurl="/"
                    >
                        <GoogleIcon />
                    </SocialButton>
                </div>
                <div className="mt-5">
                    <p className="text-center">
                        {
                            `New user? Register `
                        }
                        <Link href={'/auth/register'}
                            className="underline"
                        >
                            here
                        </Link>
                    </p>
                </div>
            </FormCard>
        </div>
    )
}
