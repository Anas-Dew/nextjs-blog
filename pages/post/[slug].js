import React from 'react'
import { useRouter } from 'next/router'
import PostCss from "../../styles/Post.module.css"

const Post = () => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <section className={PostCss.blog_section_div}>
            <h1 className={PostCss.blog_title}>{slug}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad assumenda impedit in corporis cumque ab, doloremque incidunt, quo ipsam provident, suscipit nemo eligendi. Omnis, odit! Dolores sit repellendus voluptate quaerat voluptatibus, minima culpa explicabo, adipisci cumque asperiores porro repudiandae! Nobis accusamus mollitia consequuntur aliquid vitae magni unde quibusdam repellendus omnis?</p>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad assumenda impedit in corporis cumque ab, doloremque incidunt, quo ipsam provident, suscipit nemo eligendi. Omnis, odit! Dolores sit repellendus voluptate quaerat voluptatibus, minima culpa explicabo, adipisci cumque asperiores porro repudiandae! Nobis accusamus mollitia consequuntur aliquid vitae magni unde quibusdam repellendus omnis?</p>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad assumenda impedit in corporis cumque ab, doloremque incidunt, quo ipsam provident, suscipit nemo eligendi. Omnis, odit! Dolores sit repellendus voluptate quaerat voluptatibus, minima culpa explicabo, adipisci cumque asperiores porro repudiandae! Nobis accusamus mollitia consequuntur aliquid vitae magni unde quibusdam repellendus omnis?</p>

        </section>
    )
}

export default Post