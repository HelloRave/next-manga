'use client'

import { signIn } from 'next-auth/react';
import { ButtonHTMLAttributes } from 'react';

type ISocialButton = {
    readonly children: React.ReactNode;
    readonly title: string;
    readonly className?: string;
    readonly provider: string;
    readonly callbackurl: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function SocialButton({
    children, title, className, ...props
}: ISocialButton) {
    return (
        <button
            type={ props.type }
            className={
                `flex gap-x-4 rounded px-6 py-2.5 font-medium shadow-md max-w-fit
                ${ className }`
            }
            onClick={ () => signIn(props.provider, {
                callbackUrl: props.callbackurl,
            }) }
            {...props}
        >
            { children }
            <span>{ title }</span>
        </button>
    )
}