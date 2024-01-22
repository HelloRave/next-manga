import RegisterHookForm from "@/components/RegisterHookForm";
import FormCard from "@/components/FormCard";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-full flex justify-center my-10">
            <FormCard
                title="Sign up for an account"
                className="w-1/2 py-10 shadow-md rounded bg-white"
            >
                <RegisterHookForm />
                <div className="mt-5">
                    <p className="text-center">
                        {
                            `Already have an account? Login `
                        }
                        <Link href={'/auth/signin'}
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