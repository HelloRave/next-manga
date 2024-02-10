import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import moment from "moment";

(() => {
    const mangas: Prisma.MangaCreateInput[] = [
        {
            title: 'Hunter x Hunter',
            description: `
                The story focuses on a young boy named Gon Freecss who discovers that his father, who left him at a young age, is actually a world-renowned Hunter, a licensed professional who specializes in fantastical pursuits such as locating rare or unidentified animal species, treasure hunting, surveying unexplored enclaves, or hunting down lawless individuals.
            `,
            ongoing: false,
            animeAdaptaion: true,
            firstPublished: moment({
                year: 1998, month: 3, day: 3
            }).toDate(),
            author: {
                connectOrCreate: {
                    create: {
                        name: 'Togashi Yoshihiro',
                    },
                    where: {
                        name: 'Togashi Yoshihiro',
                    }
                },
            },
            categories: {
                connectOrCreate: [
                    {
                        where: { name: 'action' },
                        create: { name: 'action' },
                    },
                    {
                        where: { name: 'adventure' },
                        create: { name: 'adventure' },
                    },
                    {
                        where: { name: 'fantasy' },
                        create: { name: 'fantasy' },
                    },
                ],
            },
        },
        {
            title: 'Haikyuu!!',
            description: `
                The story follows Shoyo Hinata, a boy determined to become a great volleyball player despite his small stature.
            `,
            ongoing: false,
            animeAdaptaion: true,
            firstPublished: moment({
                year: 2012, month: 2, day: 20
            }).toDate(),
            author: {
                connectOrCreate: {
                    create: {
                        name: 'Furudate Haruichi',
                    },
                    where: {
                        name: 'Furudate Haruichi',
                    }
                },
            },
            categories: {
                connectOrCreate: [
                    {
                        where: { name: 'sports' },
                        create: { name: 'sports' },
                    },
                ],
            },
        },
        {
            title: 'Yuu Yuu Hakusho',
            description: `
                The series tells the story of Yusuke Urameshi, a teenage delinquent who is struck and killed by a car while attempting to save a child's life.
            `,
            ongoing: false,
            animeAdaptaion: true,
            firstPublished: moment({
                year: 1990, month: 11, day: 20
            }).toDate(),
            author: {
                connectOrCreate: {
                    create: {
                        name: 'Togashi Yoshihiro',
                    },
                    where: {
                        name: 'Togashi Yoshihiro',
                    }
                },
            },
            categories: {
                connectOrCreate: [
                    {
                        where: { name: 'action' },
                        create: { name: 'action' },
                    },
                    {
                        where: { name: 'comedy' },
                        create: { name: 'comedy' },
                    },
                    {
                        where: { name: 'drama' },
                        create: { name: 'drama' },
                    },
                ],
            },
        },
    ]

    Promise
        .all(
            mangas.map(async (manga) => {
                const result = await prisma.manga.findUnique({
                    where: { title: manga.title },
                });
                result ? 
                await prisma.manga.update({
                    where: { title: manga.title },
                    data: manga,
                })
                :
                await prisma.manga.create({
                    data: manga,
                });
            })
        )
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
})()
