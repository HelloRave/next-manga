import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body: { formData: {
            name: string, email: string, password: string,
        } } = await req.json();
        const userData = body.formData;

        if (!userData?.email || !userData?.password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const duplicate = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        });

        if (duplicate) {
            return NextResponse.json(
                { message: "Duplicate email" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
            }
        });
        return NextResponse.json(
            { message: "User created" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
