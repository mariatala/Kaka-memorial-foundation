import 'dotenv/config';
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '../src/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from '@better-auth/utils/password';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL!,
  }),
});

function makeId(): string {
  return randomBytes(16).toString('hex');
}

interface AdminConfig {
  name: string;
  email: string;
  password: string;
}

function loadAdmins(): AdminConfig[] {
  const admins: AdminConfig[] = [];
  for (let i = 1; i <= 3; i++) {
    const name = process.env[`ADMIN_${i}_NAME`];
    const email = process.env[`ADMIN_${i}_EMAIL`];
    const password = process.env[`ADMIN_${i}_PASSWORD`];
    if (!name || !email || !password) {
      console.log(`  ⚠  Admin ${i}: ADMIN_${i}_NAME / _EMAIL / _PASSWORD not set — skipped`);
      continue;
    }
    admins.push({ name, email, password });
  }
  return admins;
}

const DEFAULT_EVENT_CATEGORIES = [
  {
    title: 'Community Outreach Events',
    subtitle: 'Join hands to uplift communities.',
    about: 'These events focus on providing direct support to underserved areas through educational drives, clean water projects, and humanitarian relief. Be part of real impact where its needed most.',
    date: null,
    location: '',
    imageUrl: '/school.png',
    background: 'bg-secondary',
  },
  {
    title: 'Advocacy & Awareness Campaigns',
    subtitle: 'Lend your voice to justice and human dignity',
    about: 'Help raise awareness on key issues like human rights, education, gender equality, and rural development. From rallies to school talks, your presence and voice make a difference.',
    date: null,
    location: '',
    imageUrl: '/xtalk.jpg',
    background: 'bg-accent-one',
  },
  {
    title: 'Fundraising & Partnership Events',
    subtitle: 'Support the mission. Expand the impact.',
    about: 'These events bring together well-wishers, donors, and organizations to raise resources and build strategic partnerships that fuel our life-changing programs across communities.',
    date: null,
    location: '',
    imageUrl: '/education2.jpeg',
    background: 'bg-accent-two',
  },
];

async function main() {
  console.log('Seeding admin accounts…\n');

  const admins = loadAdmins();
  if (admins.length === 0) {
    console.log(
      'Nothing to seed. Add ADMIN_1_NAME, ADMIN_1_EMAIL, ADMIN_1_PASSWORD\n' +
      '(and optionally ADMIN_2_*, ADMIN_3_*) to your .env file.',
    );
    return;
  }

  for (const { name, email, password } of admins) {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      if (existing.role !== 'admin') {
        await prisma.user.update({ where: { email }, data: { role: 'admin' } });
        console.log(`  ✓ Promoted to admin: ${email}`);
      } else {
        console.log(`  ✓ Already admin: ${email}`);
      }
      continue;
    }

    const userId = makeId();
    const hashedPw = await hashPassword(password);
    const now = new Date();

    await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        emailVerified: false,
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      },
    });

    await prisma.account.create({
      data: {
        id: makeId(),
        accountId: userId,
        providerId: 'credential',
        userId,
        password: hashedPw,
        createdAt: now,
        updatedAt: now,
      },
    });

    console.log(`  ✓ Created admin: ${email}`);
  }

  // Statistics
  console.log('\nSeeding statistics…');
  const existingStats = await prisma.statistic.count();
  if (existingStats === 0) {
    const DEFAULT_STATISTICS = [
      { prefix: '$', value: '100', suffix: '', description: 'Raised Through Grants', order: 1 },
      { prefix: '₦', value: '147740', suffix: '', description: 'Raised Through Donations', order: 2 },
      { prefix: '', value: '500', suffix: '+', description: 'People Served by Kaka Foundation', order: 3 },
      { prefix: '', value: '7', suffix: '', description: 'Programs Initiated Since 2022', order: 4 },
      { prefix: '', value: '9', suffix: '', description: 'Volunteers Across Abuja', order: 5 },
    ];
    for (const stat of DEFAULT_STATISTICS) {
      await prisma.statistic.create({ data: stat });
    }
    console.log(`  ✓ Seeded ${DEFAULT_STATISTICS.length} statistics`);
  } else {
    console.log(`  ✓ Statistics already exist (${existingStats}) — skipped`);
  }

  // Carousel items
  console.log('\nSeeding carousel items…');
  const existingCarousel = await prisma.carouselItem.count();
  if (existingCarousel === 0) {
    const DEFAULT_CAROUSEL = [
      {
        title: 'X-Space Public Engagement',
        description: 'Had a dialogue featuring Canadian Indigenous and Brazilian-Canadian human rights and social justice advocates, as we unpacked the ongoing LEA strike in Abuja and its impact on Education.',
        imageSrc: '/xtalk.jpg',
        imageAlt: 'X-Space public engagement session',
        link: null,
        order: 1,
      },
      {
        title: 'Water Access Advocacy, Shapi Community, Kwali Area Council',
        description: 'Through direct engagement with the Area Council Chairman, Kaka Memorial Foundation successfully advocated for improved water access for residents of Shapi community, securing a critical need in this underserved area.',
        imageSrc: '/water.jpg',
        imageAlt: 'Water access advocacy in Shapi community',
        link: null,
        order: 2,
      },
      {
        title: 'Youth Innovation Summit',
        description: 'Discussed innovative solutions with youth leaders across Africa on sustainable development, education, and digital transformation.',
        imageSrc: '/about.jpg',
        imageAlt: 'Youth Innovation Summit',
        link: null,
        order: 3,
      },
    ];
    for (const item of DEFAULT_CAROUSEL) {
      await prisma.carouselItem.create({ data: item });
    }
    console.log(`  ✓ Seeded ${DEFAULT_CAROUSEL.length} carousel items`);
  } else {
    console.log(`  ✓ Carousel items already exist (${existingCarousel}) — skipped`);
  }

  // Event categories
  console.log('\nSeeding event categories…');
  const existingCount = await prisma.eventCategory.count();
  if (existingCount === 0) {
    for (const cat of DEFAULT_EVENT_CATEGORIES) {
      await prisma.eventCategory.create({ data: cat });
    }
    console.log(`  ✓ Seeded ${DEFAULT_EVENT_CATEGORIES.length} event categories`);
  } else {
    console.log(`  ✓ Event categories already exist (${existingCount}) — skipped`);
  }

  console.log('\nDone.');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
