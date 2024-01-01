import getSongs from '@/actions/getSongs';
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import Image from 'next/image'
import PageContent from './components/PageContent';
import EightysDelights from './components/EightysDelights';
import TopPicksContent from './components/TopPicksContent';
import MagicalNinetys from './components/EightysDelights copy';
import SeventysDelights from './components/SeventysDelights';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className='
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
     '>
      <Header>
        <div className='mb-2'>
          <h1
            className='
            text-[#372133]
            dark:text-[#EAC56A]
            text-4xl
            font-semibold
            '
          >
            Go retro!
          </h1>
          <div className='
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
          '>
            <ListItem
              image="/assets/like.png"
              name="My favorites"
              href='liked'
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-[#372133] dark:text-[#EAC56A] text-3xl font-semibold'>
            Magical 80s
          </h1>
        </div>
        <EightysDelights songs={songs}/>
      </div>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-[#372133] dark:text-[#EAC56A] text-3xl font-semibold'>
            Delightful 70s
          </h1>
        </div>
        <SeventysDelights songs={songs}/>
      </div>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-[#372133] dark:text-[#EAC56A] text-3xl font-semibold'>
            Collection
          </h1>
        </div>
        <PageContent songs={songs}/>
      </div>
    </div>
  )
}
