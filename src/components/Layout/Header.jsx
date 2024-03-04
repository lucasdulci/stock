export const Header = () => {
  return (
    <div className='md:flex mt-5 justify-center pb-10 pt-1 lg:pb-1'>
      <div className='flex flex-col items-center '>
        
        <img className='w-80 md:w-auto ' src="/logostorage-amarillo.png" alt="" />
        <h2 className='text-2xl font-bold pl-4 dark:text-white'>Control del {' '}<span className='text-yellow-500 font-black'>stock</span></h2>

      </div>
    </div>
  )
}
