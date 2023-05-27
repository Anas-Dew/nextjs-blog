import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })
const Blogs = () => {
    const [Blogs, setBlogs] = useState([])
    useEffect(() => {
        axios.get('/api/blogs').then((res) => {
            console.log(res.data);
            setBlogs(res.data)
        })
    }, [])

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {Blogs.map((blogItem) => {
                    return <Link
                        href={`/post/${blogItem.slug}`}
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                        rel="noopener noreferrer"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            {blogItem.title}{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            {blogItem.content.slice(0, 60)}...
                        </p>
                    </Link>
                })}
            </div>
        </main>
    )
}

export default Blogs