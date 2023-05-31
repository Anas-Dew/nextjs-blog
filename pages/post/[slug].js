import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PostCss from "../../styles/Post.module.css"
import axios from 'axios'
const Post = (props) => {
    // const router = useRouter()
    const [Content, setContent] = useState(props.content)
    // THIS IS GOOD BUT IS NOT GOOD FOR SEO AS IT USES JS TO POPULATE SITE. NOT RAW HTML
    // useEffect(() => {
    //     if (!router.isReady) { return }
    //     const { slug } = router.query
    //     axios.get(`/api/post?slug=${slug}`).then((res) => {
    //         console.log(res.data);
    //         setContent(res.data)
    //     })
    // }, [router.isReady])

    return (
        <section className={PostCss.blog_section_div}>
            <h1 className={PostCss.blog_title}>{Content.title}</h1>
            {/* <section dangerouslySetInnerHTML={Content.content}></section> */}
            <section dangerouslySetInnerHTML={{__html : Content.content}}></section>
            <p className='mt-5'>By {Content.author}, published on {Content.date}</p>
        </section>
    )
}

// THIS CREATES HTML ON DEMAND. ON EACH REQUEST.
// This gets called on every request
export async function getServerSideProps(context) {
    // Fetch data from external API
    let { slug } = context.query;
    let response = await axios.get(`http://localhost:3000/api/post?slug=${slug}`)

    let content = await response.data
    // console.log(data);
    // Pass data to the page via props
    return { props: { content } };
}

// 

export default Post