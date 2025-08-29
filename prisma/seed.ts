import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias (usando upsert para evitar duplicação)
  const categoriaCiencias = await prisma.categoria.upsert({
    where: { nome: 'Ciencias sociais' },
    update: {},
    create: { nome: 'Ciencias sociais' }
  })

  const categoriaSaude = await prisma.categoria.upsert({
    where: { nome: 'Saúde' },
    update: {},
    create: { nome: 'Saúde' }
  })
  
  
  await prisma.curso.createMany({
    data: [
      {
        nome: 'Direito',
        descricao: 'Curso de direito',
        preco: 299.99,
        imagens: ['/images/cursos.jpg'],
        conteudo: 'Modulo 1: Introdução \nModulo 2: Avançado',
        popular: true,
        categoriaId: categoriaCiencias.id
      },
      {
        nome: 'Psicologia',
        descricao: 'Curso de psicologia',
        preco: 249.99,
        imagens: ['/images/cursos.jpg'],
        conteudo: 'Modulo 1: Introdução \nModulo 2: Avançado',
        popular: true,
        categoriaId: categoriaSaude.id
      }
    ],
    skipDuplicates: true
  })

  
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.usuario.upsert({
    where: { email: 'admin@nossafaculdade.com' },
    update: {},
    create: {
      email: 'admin@nossafaculdade.com',
      senha: hashedPassword
    }
  })

  console.log('Dados iniciais criados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })