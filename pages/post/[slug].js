import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PostCss from "../../styles/Post.module.css"
import axios from 'axios'
const Post = () => {
    const router = useRouter()
    const [Content, setContent] = useState([])
    useEffect(() => {
        if (!router.isReady) { return }
        const { slug } = router.query
        axios.get(`/api/post?slug=${slug}`).then((res) => {
            console.log(res.data);
            setContent(res.data)
        })
    }, [router.isReady])
    
    return (
        <section className={PostCss.blog_section_div}>
            <h1 className={PostCss.blog_title}>{Content.title}</h1>
            {/* <section dangerouslySetInnerHTML={Content.content}></section> */}
            <section>{Content.content}</section>
            <p className='mt-5'>By {Content.author}, published on {Content.date}</p>
        </section>
    )
}

export default Post