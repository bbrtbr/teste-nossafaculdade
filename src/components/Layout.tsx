import React, { ReactNode } from 'react';
import Image from 'next/image';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      <header>

        <div className="w-full bg-blue-900 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-between md:justify-end text-sm text-center md:space-x-6">
              <a className="w-1/2 sm:w-auto mb-2 sm:mb-0 md:w-auto md:mb-0 hover:text-yellow-400" href="/academico">Acadêmico</a>
              <a className="w-1/2 sm:w-auto mb-2 sm:mb-0 md:w-auto md:mb-0 hover:text-yellow-400" href="/institucional">Institucional</a>
              <button className="w-1/2 sm:w-auto mb-2 sm:mb-0 md:w-auto md:mb-0 text-white hover:text-yellow-400">Seja Polo</button>
              <a className="w-1/2 sm:w-auto mb-2 sm:mb-0 md:w-auto md:mb-0 hover:text-yellow-400" href="/vestibular">Vestibular</a>
            </div>
          </div>
        </div>

        <nav className="bg-white text-blue-900 py-3 shadow-sm border-b-2 border-yellow-600">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <a className="flex items-center" href="/">
                  <Image
                    alt="Logo UNIFAMEC"
                    width={230}
                    height={100}
                    className="w-[140px] h-auto md:w-[230px] md:h-auto"
                    src="/images/logo.jpg"
                  />
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a className="font-medium hover:text-yellow-600" href="/cursos/graduacao-presencial">Graduação Presencial</a>
                <span className="text-gray-300">|</span>
                <a className="font-medium hover:text-yellow-600" href="/cursos/graduacao-semipresencial">Graduação Semi Presencial</a>
                <span className="text-gray-300">|</span>
                <a className="font-medium hover:text-yellow-600" href="/cursos/graduacao-ead">Graduação EAD</a>
                <a target="_blank" rel="noopener noreferrer" className="premium-button" href="/login-institucional">
                  <div className="flex items-center text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Login
                  </div>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <div className="bg-blue-900 text-white pt-12 pb-6">
          <div className="container mx-auto px-4">
            <div className="h-1 bg-yellow-600 w-full mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-yellow-600 pl-3">Institucional</h3>
                <ul className="space-y-2">
                  <li><a className="footer-link" href="/institucional">CPA</a></li>
                  <li><a className="footer-link" href="/documentos-institucionais">Documentos Institucionais</a></li>
                  <li><a className="footer-link" href="/politica_privacidade">Política de privacidade</a></li>
                  <li><a className="footer-link" href="/institucional">Quem somos</a></li>
                  <li><a className="footer-link" href="/academico">Acadêmico</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-yellow-600 pl-3">Cursos</h3>
                <ul className="space-y-2">
                  <li><a className="footer-link" href="/cursos/graduacao-presencial">Graduação Presencial</a></li>
                  <li><a className="footer-link" href="/cursos/graduacao-semipresencial">Graduação Semi Presencial</a></li>
                  <li><a className="footer-link" href="/cursos/graduacao-ead">Graduação EAD</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-yellow-600 pl-3">Atendimento</h3>
                <ul className="space-y-2">
                  <li><a href="mailto:comercial@nossafaculdade.com.br" className="footer-link">comercial@nossafaculdade.com.br</a></li>
                  <li><a href="mailto:secretaria@nossafaculdade.com.br" className="footer-link">secretaria@nossafaculdade.com.br</a></li>
                  <li><a href="https://api.whatsapp.com/send/?phone=558001770800&text&type=phone_number&app_absent=0" className="footer-link">(88) 0800 1770 800</a></li>
                  <li><a href="https://api.whatsapp.com/send/?phone=558899139972&text&type=phone_number&app_absent=0" className="footer-link">(88) 99913-9972</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-yellow-600 pl-3">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/unifameccariri/" className="text-white hover:text-yellow-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/fameccariri/" className="text-white hover:text-yellow-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z"></path>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@gruponossafaculdade7981" className="text-white hover:text-yellow-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a2.99 2.99 0 00-2.106-2.11C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.392.576a2.99 2.99 0 00-2.106 2.11C0 7.956 0 12 0 12s0 4.044.502 5.814a2.99 2.99 0 002.106 2.11C4.378 20.5 12 20.5 12 20.5s7.622 0 9.392-.576a2.99 2.99 0 002.106-2.11C24 16.044 24 12 24 12s0-4.044-.502-5.814zM9.75 15.568V8.432L15.75 12l-6 3.568z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 text-left">
                <a target="_blank" rel="noopener noreferrer" href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MjI5MzI=">
                  <p className="mt-2 text-sm text-white hover:text-yellow-400 transition">
                    <span className="font-semibold">Consulte o cadastro da <br /> Instituição no Sistema e-MEC</span>
                  </p>
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <p className="text-sm">Av. Padre Cícero, 3000 - São José, Crato - CE, 63132-022</p>
                <p className="text-sm">Horário de atendimento: Segunda a sexta das 8h às 17h</p>
                <p className="text-sm">UNIFAMEC - CNPJ: 23.957.843/0001-86</p>
              </div>
            </div>
            <div className="text-center mt-6 text-sm text-gray-400">
              <p>© 2025 UNIFAMEC - Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}