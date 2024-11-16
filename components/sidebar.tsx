"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils';

import { LayoutDashboard, MessageSquare } from "lucide-react";
import { usePathname } from 'next/navigation';
import { FreeCounter } from './free-counter';

const sidebarLinks = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    }
]

interface SidebarProps {
    apiLimtCount: number;
}

const Sidebar = ({ apiLimtCount = 0 } : SidebarProps) => {
    const pathname = usePathname();
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
        <div className='px-3 py-2 flex-1'>
            <Link className='flex' href='/dashboard'>
                <div className='relative w-8 h-8 mr-4'>
                    <Image fill alt='Logo' src='/images/logo.png'/>
                </div>
                <h1 className='text-2xl font-bold'>
                    LGTV
                </h1>
            </Link>
            <div className='space-y-1'>
                {sidebarLinks.map((link) => {
                    return(
                        <Link
                            href={link.href}
                            key={link.href}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname === link.href ? 'text-white bg-white/10' : 'text-zinc-400')}
                        >
                            <div className='flex items-center flex-1'>
                                <link.icon className={cn('h-5 w-5 mr-3', link.color)} />
                                {link.label}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
        <FreeCounter
            apiLimtCount={apiLimtCount}
        />
    </div>
  )
}

export default Sidebar