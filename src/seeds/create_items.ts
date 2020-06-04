import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.items.create({
    data: {
      title: 'Lâmpadas', image: 'lampadas.svg',
    }
  })
  .catch(e => {
    console.log(e);
  })
  await prisma.items.create({
    data: {
      title: 'Pilhas e Baterias', image: 'baterias.svg',
    }
  })
  .catch(e => {
    console.log(e);
  });
  await prisma.items.create({
    data: {
      title: 'Papéis e Papelão', image: 'papeis-papelao.svg',
    }
  })
  .catch(e => {
    console.log(e);
  });
  await prisma.items.create({
    data: {
      title: 'Resíduos Eletrônicos', image: 'eletronicos.svg',
    }
  })
  .catch(e => {
    console.log(e);
  });
  await prisma.items.create({
    data: {
      title: 'Resíduos Orgânicos', image: 'organicos.svg',
    }
  })
  .catch(e => {
    console.log(e);
  });
  await prisma.items.create({
    data: {
      title: 'Óleo de Cozinha', image: 'oleo.svg',
    }
  })
  .catch(e => {
    console.log(e);
  });
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  });