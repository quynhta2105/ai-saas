import Image from 'next/image'
import React from 'react'

export const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
        <div className='w-10 h-10 relative animate-ping'>
            <Image 
                alt='logo'
                fill
                src='/images/logo.png'
            />
        </div>
        <p className='text-sm text-muted-foreground'>
            AI is thinking...
        </p>
    </div>
  )
}
