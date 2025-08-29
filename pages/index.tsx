import { GetStaticProps } from 'next';
import { Curso } from '../src/types/curso';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ListCursoModal from '../src/components/ListCursoModal';

interface HomeProps {
  cursos: Curso[];
}

interface Banner {
  id: number;
  image: string;
  link: string;
  alt: string;
}

export default function HomePage({ cursos = [] }: HomeProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const banners: Banner[] = [
    {
      id: 1,
      image: "/images/banner.jpg",
      link: "/vestibular",
      alt: "Banner 1 UNIFAMEC"
    },
    {
      id: 2,
      image: "/images/banner2.jpg",
      link: "/cursos",
      alt: "Banner 2 UNIFAMEC"
    },
    {
      id: 3,
      image: "/images/banner.jpg",
      link: "/bolsas",
      alt: "Banner 3 UNIFAMEC"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <section className="relative w-full">
        <div className="relative w-full aspect-video sm:h-[60vh] md:h-[80vh] bg-[#00194A] overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Link href={banner.link}>
                <Image
                  alt={banner.alt}
                  fill
                  className="object-contain object-center"
                  src={banner.image}
                  priority={index === 0}
                />
              </Link>
            </div>
          ))}

          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 sm:p-2 md:p-3 shadow-md hover:bg-white/30 backdrop-blur-md transition border border-white/30"
            onClick={prevBanner}
            aria-label="Banner anterior"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="sm:hidden" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
            </svg>
          </button>

          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 sm:p-2 md:p-3 shadow-md hover:bg-white/30 backdrop-blur-md transition border border-white/30"
            onClick={nextBanner}
            aria-label="Próximo banner"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="sm:hidden" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === currentBannerIndex ? 'bg-yellow-500 scale-110' : 'bg-white/50'}`}
                onClick={() => setCurrentBannerIndex(index)}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>

          <Link
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 text-sm font-semibold text-white rounded shadow-md transition border border-white/50 bg-opacity-80 backdrop-blur-sm sm:hidden"
            style={{ backgroundColor: '#031733', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
            href="/vestibular"
          >
            Faça agora mesmo
          </Link>
        </div>

        <Link
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 px-12 py-3 text-xl font-bold text-white rounded shadow-lg transition border-4 border-white/70 hidden sm:block text-balance text-center"
          style={{ backgroundColor: '#031733', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
          href="/vestibular"
        >
          Faça agora mesmo
        </Link>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="px-4 py-2 border-2 rounded-md font-semibold text-sm md:text-base transition bg-blue-900 text-white border-blue-900" onClick={() => setIsModalOpen(true)}>
              Graduação Presencial
            </button>
            <button className="px-4 py-2 border-2 rounded-md font-semibold text-sm md:text-base transition text-blue-900 border-blue-900 hover:bg-blue-50">
              Graduação Semipresencial
            </button>
            <button className="px-4 py-2 border-2 rounded-md font-semibold text-sm md:text-base transition text-blue-900 border-blue-900 hover:bg-blue-50">
              Graduação (EaD)
            </button>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <ListCursoModal cursos={cursos} />
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="premium-heading text-blue-800 text-3xl font-bold inline-block px-4 py-2">
              Acelere seu crescimento pessoal e profissional
            </h2>
            <div className="gold-divider max-w-xs mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-600">
                <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Cursos autorizados pelo MEC</h3>
              <p className="text-gray-600">
                Todos os cursos ofertados pela UNIFAMEC são autorizados pelo MEC, garantindo ao aluno um aprendizado com excelência.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-600">
                <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Professores qualificados</h3>
              <p className="text-gray-600">
                Aprender com quem ama estudar e ensinar é muito inspirador. Na UNIFAMEC os professores são altamente qualificados para preparar os alunos em suas áreas do conhecimento.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-600">
                <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Você estuda no seu ritmo</h3>
              <p className="text-gray-600">
                Cursos de Graduação e Pós-graduação na modalidade EAD, onde a flexibilidade do tempo conta. O aluno estuda e aprende de onde estiver.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-600">
                <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Mais de 19 mil alunos em todo Brasil</h3>
              <p className="text-gray-600">
                A UNIFAMEC já ajudou milhares de pessoas a realizar seus sonhos na Graduação, Extensão e Pós-Graduação, por meio de uma Educação humana e de qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          O que nossos alunos dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center border-2 border-yellow-600">
            <p className="italic text-gray-600">
              "Os cursos são de alta qualidade e me ajudaram a conseguir uma promoção. Recomendo!"
            </p>
            <p className="font-semibold mt-4 text-blue-900">- João Silva</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center border-2 border-yellow-600">
            <p className="italic text-gray-600">
              "A flexibilidade me permitiu estudar mesmo com a minha rotina agitada. Excelente!"
            </p>
            <p className="font-semibold mt-4 text-blue-900">- Maria Souza</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center border-2 border-yellow-600">
            <p className="italic text-gray-600">
              "O conteúdo é prático e fácil de entender. Aprendi mais aqui do que na faculdade."
            </p>
            <p className="font-semibold mt-4 text-blue-900">- Pedro Santos</p>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cursos`);

    if (!res.ok) {
      throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
    }

    const cursos = await res.json();

    return {
      props: {
        cursos,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Erro em getStaticProps:', error);
    return {
      props: {
        cursos: [],
      },
      revalidate: 60,
    };
  }
};