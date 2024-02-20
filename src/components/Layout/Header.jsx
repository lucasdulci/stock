export const Header = () => {
  return (
    <div className='md:flex justify-center pb-5'>
      <div className='flex flex-col items-center'>
        <img src="/logostorage-amarillo.png" alt="" />
        <h2 className='text-2xl font-bold pl-4 dark:text-white'>Control del {' '}<span className='text-yellow-500 font-black'>stock</span></h2>

      </div>
    </div>
  )
}
