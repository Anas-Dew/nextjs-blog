import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

export default function Home(props) {
  const [FeedBlogs, setFeedBlogs] = useState(props.data)
  const slicedBlogs = FeedBlogs.slice(1, 3);
  return (<>

    <Head>
      <title>AI Blog by Anas Dew</title>
    </Head>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className='flex flex-col md:flex-row '>

        <section class="text-gray-600 body-font">
          <div class="container  mx-auto">
            <div class="flex flex-wrap">
              <div>
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog" />
                  <div class="p-6">
                    {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2> */}
                    <h1 class="title-font text-lg font-medium mb-3">{FeedBlogs[0].title}</h1>
                    <p class="leading-relaxed mb-3">{FeedBlogs[0].meta_description.slice(0, 70)}...</p>
                    <div class="flex items-center flex-wrap ">
                      <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href={`/post/${FeedBlogs[0].slug}`}>Know More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        
                      </a>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mb-32 flex flex-col p-1 lg:mb-0 lg:grid-cols-2 lg:text-left">
          {slicedBlogs.map((blogItem) => {
            return <Link key={blogItem.slug}
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
                {blogItem.meta_description.slice(0, 60)}...
              </p>
            </Link>
          })}  <Link
          href="/blogs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

          rel="noopener noreferrer"
        >
          <p className={`mt-3`}>
            Recent Blogs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </p>
        
        </Link></div>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">



      </div>
    </main>
  </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  // console.log(context);
  let blogs = await axios.get('http://localhost:3000/api/getblogs')

  let data = await blogs.data
  console.log(data);
  // console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}