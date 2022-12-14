import { FormEvent, useState } from 'react'

import Image from 'next/image'

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCount: number;
}


export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      // Pega o código gerado e deixa copiado na área de transferência
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, código copiado para área de transferência')

      setPoolTitle('')

    } catch (error) {
      alert('Falha ao criar o bolão, tente novamente')
    }

  }

  console.log(poolTitle)

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image
          src={logoImg}
          alt="NLW Copa"
        />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image
            src={usersAvatarExampleImg}
            alt=""
          />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+ {props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form
          className='mt-10 flex gap-2'
          onSubmit={createPool}
          onChange={event => setPoolTitle(event.target.value)}
        >
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-white'
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            value={poolTitle}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'
          >
            Criar meu bolão
          </button>
        </form>

        <p
          className='mt-4 text-sm text-gray-300 leading-relaxed'
        >
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100 '>
          <div
            className='flex items-center gap-6'
          >
            <Image
              src={iconCheckImg}
              alt=""
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl' >+ {props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'></div>

          <div
            className='flex items-center gap-6'
          >
            <Image
              src={iconCheckImg}
              alt=""
            />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl' >+ {props.guessesCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação mobile NLW Copa"
        quality={100}
      />
    </div>
  )
}


// Consumo do servidor com next
export const getServerSideProps = async () => {

  // Organiza as chamadas na API deixando-as em paralelo
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count

    }
  }
}
