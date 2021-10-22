import Image from 'next/image'

interface BannerProps {
  color: string
}

const Banner: React.FC<BannerProps> = ({ color }) => {
  return (
    <div className='bg-black text-white py-2'>
      <h1 className='font-heading inline text-6xl mx-4'>
        Oroko will launch December 2021
      </h1>
      <Image
        src='/../public/images/Oroko Small Logo White Lines.svg'
        alt='Oroko logo small'
        height='50'
        width='50'
      />
      <p className='font-serif inline text-5xl mx-4'>Stay Tuned</p>
      <Image
        src='/../public/images/Oroko Small Logo White Lines.svg'
        alt='Oroko logo small'
        height='50'
        width='50'
      />
    </div>
  )
}

export default Banner
