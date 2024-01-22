'use client'

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import InputGroup from "./InputGroup"

type TLoginSchema = {
    email: string
    password: string
}

export default function LoginHookForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
        reset
    } = useForm<TLoginSchema>();

    const searchParams = useSearchParams();

    const onSubmit = handleSubmit(async data => {
        await signIn("credentials", {
            email: data.email, password: data.password,
            callbackUrl: `${searchParams.get('callbackUrl') ?? undefined}/`,
        });

        reset();
    });

    const emailValidation = {
        label: 'Email',
        type: 'text',
        register: register,
        rules: { required: true }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div>
                <InputGroup<TLoginSchema>
                    name='email'
                    placeholder="joe@email.com"
                    { ...emailValidation }
                />
            </div>
            <div>
                <InputGroup<TLoginSchema>
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    rules={{required: true}}
                />
            </div>
            {
                searchParams.get('error') === 'CredentialsSignin' &&
                <p className="text-pink-500">
                    Invalid Credentials
                </p>
            }
            <button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="bg-indigo-600 mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                    disabled:bg-slate-300
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded"
            >
                Submit
            </button>
        </form>
    )
}