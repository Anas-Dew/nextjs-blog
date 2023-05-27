import React from 'react'
import { useRouter } from 'next/router'
import PostCss from "../../styles/Post.module.css"

const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <section className={PostCss.blog_section_div}>
            <h1 className={PostCss.blog_title}>{slug}</h1>
            

        </section>
    )
}

export default Post