import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const platforms = [
    {
      name: 'pc',
      longName: 'PC',
    },
    {
      name: 'ps5',
      longName: 'PlayStation 5',
    },
    {
      name: 'ps4',
      longName: 'PlayStation 4',
    },
    {
      name: 'vita',
      longName: 'PlayStation Vita',
    },
    {
      name: 'xbxs',
      longName: 'Xbox Series X/S',
    },
    {
      name: 'xb1',
      longName: 'Xbox One',
    },
    {
      name: 'wii-u',
      longName: 'Wii U',
    },
    {
      name: 'switch',
      longName: 'Nintendo Switch',
    },
    {
      name: 'oculus',
      longName: 'Oculus',
    },
    {
      name: 'vive',
      longName: 'HTC Vive',
    },
    {
      name: 'psvr',
      longName: 'PlayStation VR',
    },
    {
      name: '3ds',
      longName: 'Nintendo 3DS',
    },
    {
      name: 'stadia',
      longName: 'Google Stadia',
    },
  ];

  await prisma.platform.createMany({
    data: platforms,
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
