interface IFormCard {
    readonly children: React.ReactNode;
    readonly title: string;
    readonly className: string;
}

export default function FormCard({ children, title, className }: IFormCard) {
    return (
        <div className={`flex flex-col justify-center items-center ${className}`}>
            <div className="sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    {title}
                </h2>
            </div>
            <div className="mt-10 sm:w-full sm:max-w-sm">
                {children}
            </div>
        </div>
    )
}
